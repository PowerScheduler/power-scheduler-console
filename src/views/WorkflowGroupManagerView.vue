<template>
  <div>
    <a-button type="primary" @click="openSaveModel(null)" class="mb-2">新建</a-button>
    <div class="search-result-list">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'secret'">
            <RevealText :value="record.secret" />
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <span class="mr-1 text-blue-500 cursor-pointer" @click="openSaveModel(record)">
              编辑
            </span>
          </template>
        </template>
      </a-table>
    </div>

    <WorkflowGroupSaveModal ref="workflowGroupSaveModalRef" @onSubmitSuccess="onSubmitSuccess" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import requestForPage from '@/utils/pageRequest'
import WorkflowGroupSaveModal from '@/components/WorkflowGroupSaveModal.vue'
import RevealText from '@/components/RevealText.vue'
import { globalStore } from '@/stores/global'
import { listWorkflowGroup } from '@/service/api/workflowGroupApi'

const workflowGroupSaveModalRef = ref()
const dataSource = ref([])
const columns = [
  {
    title: '分组名称',
    dataIndex: 'name'
  },
  {
    title: '分组编码',
    dataIndex: 'code'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt'
  },
  {
    title: '操作',
    dataIndex: 'action'
  }
]

const { run, loading, current, pageSize, pagination, handleTableChange } = requestForPage(
  async (params) => listWorkflowGroup(params),
  {
    onSuccess: (data) => {
      dataSource.value = data.content
    }
  }
)

const openSaveModel = (record) => {
  workflowGroupSaveModalRef.value.openModal(record)
}

const onSubmitSuccess = async () => {
  const namespaceCode = globalStore.getNamespaceCode()
  run({ namespaceCode, pageNo: current.value, pageSize: pageSize.value })
}

onMounted(() => {
  const namespaceCode = globalStore.getNamespaceCode()
  run({ namespaceCode, pageNo: current.value, pageSize: pageSize.value })
})
</script>
