<template>
  <div class="border border-gray-300 bg-white rounded-md shadow-sm p-3 text-xs w-[250px]">
    <div class="label h-[16px] leading-[16px]">{{ data.name }}</div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'

// 注入 X6 提供的 getNode 方法（X6 会自动注入）
const getNode = inject('getNode')
const data = ref({
  name: '默认文案',
  status: 'running'
})

onMounted(() => {
  const node = getNode()
  data.value = node.getData()
  // 监听 X6 data 变化
  node.on('change:data', ({ current }) => {
    data.value = current
  })
})
</script>
