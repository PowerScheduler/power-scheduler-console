<template>
  <div :class="computedClass">
    <div class="flex items-center">
      <template v-if="currentWorkflowNodeInstance.status === 'WAITING'">
        <ClockCircleOutlined class="text-gray-500" />
      </template>
      <template v-else-if="currentWorkflowNodeInstance.status === 'RUNNING'">
        <SyncOutlined class="text-blue-500" spin />
      </template>
      <template v-else-if="currentWorkflowNodeInstance.status === 'SUCCESS'">
        <CheckCircleOutlined class="text-green-500" />
      </template>
      <template v-else-if="currentWorkflowNodeInstance.status === 'FAILED'">
        <CloseCircleOutlined class="text-red-500" />
      </template>

      <span class="ml-2 w-[180px]">{{ currentWorkflowNodeInstance.name }}</span>
      <span class="text-right">{{ nodeInstanceDuration }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'

dayjs.extend(customParseFormat)
dayjs.extend(duration)

import { inject, ref, onMounted, onUnmounted, computed } from 'vue'
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons-vue'

const now = ref(dayjs())
let timer: number | null = null

const commonClass = 'border border-gray-300 bg-white rounded-md shadow-sm p-3 text-xs w-[250px]'
const computedClass = computed(() => {
  switch (currentWorkflowNodeInstance.value.status) {
    case 'WAITING':
      return `${commonClass} border-l-4 border-l-gray-400`
    case 'RUNNING':
      return `${commonClass} border-l-4 border-l-blue-400`
    case 'SUCCESS':
      return `${commonClass} border-l-4 border-l-green-500`
    case 'FAILED':
      return `${commonClass} border-l-4 border-l-red-500`
    default:
      return commonClass
  }
})

// 注入 X6 提供的 getNode 方法（X6 会自动注入）
const getNode = inject<() => any>('getNode')

const currentWorkflowNodeInstance = ref({
  name: '默认文案',
  status: 'WAITING',
  startAt: '2022-01-01 10:20:50',
  endAt: '2022-01-04 10:20:50'
})

const nodeInstanceDuration = computed(() => {
  if (!currentWorkflowNodeInstance.value.startAt) {
    return ''
  }
  const startAt = dayjs(currentWorkflowNodeInstance.value.startAt, 'YYYY-MM-DD HH:mm:ss')
  const endAt = currentWorkflowNodeInstance.value.endAt
  const diff = endAt
    ? dayjs(endAt, 'YYYY-MM-DD HH:mm:ss').diff(startAt, 'second')
    : now.value.diff(startAt, 'second')
  return durationHuman(diff)
})

const durationHuman = (durationSec: number) => {
  if (!durationSec || durationSec < 0) return ''
  const d = dayjs.duration(durationSec, 'seconds')

  const days = Math.floor(d.asDays())
  const hours = d.hours()
  const minutes = d.minutes()
  const seconds = d.seconds()
  if (days > 0) {
    return `${days}d${hours}h`
  }
  if (hours > 0) {
    return `${hours}h${minutes}m`
  }
  if (minutes > 0) {
    return `${minutes}m${seconds}s`
  }
  return `${seconds}s`
}

onMounted(() => {
  const node = getNode!!()
  currentWorkflowNodeInstance.value = node.getData()

  timer = window.setInterval(() => {
    now.value = dayjs()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
