<template>
  <a-modal v-model:open="visibility" title="执行一次" @ok="handleRunOnce()">
    <a-row class="mt-4">
      <a-col>
        <span>确定要执行</span>
        <span class="font-semibold text-blue-500 ml-1 mr-1">{{ currentWorkflow.name }}</span>
        <span>吗？</span>
      </a-col>
    </a-row>

    <a-row class="mt-4">
      <a-col :span="6">
        <div>数据时间</div>
      </a-col>
      <a-col :span="18">
        <a-date-picker
          class="w-full"
          v-model:value="dateTime"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择数据时间"
        />
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup>
import dayjs from 'dayjs'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { runWorkflow } from '@/service/api/workflowApi'

const visibility = ref(false)
const currentWorkflow = ref({})
const dateTime = ref(null)

const handleRunOnce = async () => {
  await runWorkflow(
    { workflowId: currentWorkflow.value.id },
    { dataTime: dateTime.value.format('YYYY-MM-DD HH:mm:ss') }
  )
  message.success('操作成功')
  visibility.value = false
}

const openModal = async (record) => {
  dateTime.value = dayjs()
  currentWorkflow.value = record
  visibility.value = true
}

defineExpose({ openModal })
</script>
