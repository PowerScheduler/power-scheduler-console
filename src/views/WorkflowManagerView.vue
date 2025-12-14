<template>
  <div>
    <a-form :model="queryFormState" @finish="fetchWorkflow">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item name="workflowGroupCode" label="工作流分组">
            <a-select
              v-model:value="queryFormState.workflowGroupCode"
              show-search
              allowClear
              :options="workflowGroupOptions"
              :filterOption="false"
              @change="handleWorkflowGroupChange"
              @search="fetchWorkflowGroupOptions"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item name="name" label="工作流名称">
            <a-input v-model:value="queryFormState.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" class="text-right">
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-col>
      </a-row>
    </a-form>

    <div class="search-result-list">
      <a-button type="primary" class="mb-2" @click="goToEditor(null)">新建</a-button>
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'scheduleConfig'">
            <div>{{ record.scheduleConfig }}</div>
          </template>

          <template v-if="column.dataIndex === 'name'">
            <span v-if="record.enabled"><a-tag color="green">启用</a-tag></span>
            <span v-else><a-tag color="red">禁用</a-tag></span>
            <span>{{ record.name }}</span>
          </template>

          <template v-if="column.dataIndex === 'jobType&processor'">
            <div>{{ record.jobType.label }}</div>

            <a-typography-text
              v-if="record.jobType.code === 'JAVA'"
              :style="{ width: '150px' }"
              :ellipsis="{ tooltip: record.processor }"
              v-model:content="record.processor"
            >
            </a-typography-text>
          </template>

          <template v-if="column.dataIndex === 'operation'">
            <span class="mr-1 text-blue-500 cursor-pointer" @click="goToEditor(record)">
              编辑
            </span>

            <a-dropdown>
              <span class="mr-1 text-blue-500 cursor-pointer">更多</span>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <div class="text-blue-500 cursor-pointer" @click="handleSwitchEnable(record)">
                      <span v-if="record.enabled">禁用</span>
                      <span v-else>启用</span>
                    </div>
                  </a-menu-item>
                  <a-menu-item>
                    <div
                      class="text-blue-500 cursor-pointer"
                      @click="workerflowRunOnceModalRef.openModal(record)"
                    >
                      执行一次
                    </div>
                  </a-menu-item>
                  <a-menu-item>
                    <div class="text-blue-500 cursor-pointer" @click="showDeleteConfirm(record)">
                      删除
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </template>
      </a-table>
    </div>

    <WorkflowRunOnceModal ref="workerflowRunOnceModalRef" title="执行一次" />
  </div>
</template>

<script setup>
import { Modal, message } from 'ant-design-vue'
import { reactive, ref, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'

import requestForPage from '@/utils/pageRequest'
import { listWorkflow, switchWorkflowStatus, deleteWorkflow } from '@/service/api/workflowApi'
import WorkflowRunOnceModal from '@/components/WorkflowRunOnceModal.vue'
import { globalStore } from '@/stores/global'
import { listWorkflowGroup } from '@/service/api/workflowGroupApi'

const router = useRouter()

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '工作流名称',
    dataIndex: 'name',
    ellipsis: true
  },
  {
    title: '工作流分组',
    dataIndex: 'workflowGroupName',
    ellipsis: true
  },
  {
    title: '调度类型/调度配置',
    dataIndex: 'scheduleConfigDesc'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const [workerflowRunOnceModalRef] = [ref()]
const workflowGroupOptions = ref([])
const queryFormState = reactive({})
const dataSource = ref([])
let lastQueryParam = null

const query = async (params) => {
  lastQueryParam = params
  return listWorkflow(params)
}

const { run, loading, current, pageSize, pagination, handleTableChange } = requestForPage(query, {
  onSuccess: (data) => (dataSource.value = data.content)
})

const fetchWorkflow = () => {
  const namespaceCode = globalStore.getNamespaceCode()
  run({
    ...queryFormState,
    namespaceCode,
    pageNo: current.value,
    pageSize: pageSize.value
  })
}

const goToEditor = (record) => {
  const cachedWorkflowGroupCode = globalStore.getWorkflowGroupCode()
  if (!record && !cachedWorkflowGroupCode) {
    message.error('请先选择工作流分组')
    return
  }
  const workflowGroupCode = record ? record.workflowGroupCode : cachedWorkflowGroupCode
  router.push({
    name: '工作流编辑器',
    query: {
      workflowGroupCode,
      workflowId: record ? record.id : null
    }
  })
}

const showDeleteConfirm = (record) => {
  Modal.confirm({
    title: '删除确认',
    content: h('div', [
      h('span', '确定要删除 '),
      h('span', { class: 'font-semibold text-blue-500' }, record.name),
      h('span', ' ?')
    ]),
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await deleteWorkflow({
        workflowId: record.id
      })
      message.success('操作成功')
      const namespaceCode = globalStore.getNamespaceCode()
      run({
        ...lastQueryParam,
        namespaceCode,
        pageNo: pagination.value.current,
        pageSize: pagination.value.pageSize
      })
    }
  })
}

const handleSwitchEnable = async (record) => {
  Modal.confirm({
    title: `确认${!record.enabled ? '启用' : '禁用'}任务`,
    content: h('div', [
      h('span', `确定要${!record.enabled ? '启用' : '禁用'} `),
      h('span', { class: 'font-semibold text-blue-500' }, record.name),
      h('span', ' ?')
    ]),
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await switchWorkflowStatus({ workflowId: record.id }, { enabled: !record.enabled })
      message.success('操作成功')
      const namespaceCode = globalStore.getNamespaceCode()
      run({
        ...lastQueryParam,
        namespaceCode,
        pageNo: pagination.value.current,
        pageSize: pagination.value.pageSize
      })
    }
  })
}

const fetchWorkflowGroupOptions = async (searchText) => {
  const namespaceCode = globalStore.getNamespaceCode()
  let workflowGroupPage = await listWorkflowGroup({
    namespaceCode,
    workflowGroupName: searchText || '',
    pageNo: 1,
    pageSize: 10
  })
  workflowGroupOptions.value = workflowGroupPage.content.map((it) => {
    return {
      label: it.name,
      value: it.code
    }
  })
  if (!searchText) {
    workflowGroupOptions.value.unshift({
      label: '全部应用',
      value: ''
    })
  }
}

const handleWorkflowGroupChange = (workflowGroupCode) => {
  globalStore.setWorkflowGroupCode(workflowGroupCode)
  const namespaceCode = globalStore.getNamespaceCode()
  run({
    namespaceCode,
    workflowGroupCode: workflowGroupCode,
    pageNo: 1,
    pageSize: pageSize.value
  })
}

onMounted(() => {
  queryFormState.workflowGroupCode = globalStore.getWorkflowGroupCode()
  queryFormState.namespaceCode = globalStore.getNamespaceCode()
  fetchWorkflowGroupOptions()
  run({
    ...queryFormState,
    pageNo: current.value,
    pageSize: pageSize.value
  })
})
</script>
