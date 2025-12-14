<template>
  <a-modal v-model:open="visibility" :title="title" @ok="handleSave">
    <a-form name="basic" ref="formRef" :model="currentAppGroup">
      <a-form-item
        label="分组编码"
        name="code"
        :rules="[{ required: true, message: 'Please input code' }]"
      >
        <a-input v-model:value="currentAppGroup.code" :disabled="saveMode == 'edit'" />
      </a-form-item>
      <a-form-item
        label="分组名称"
        name="name"
        :rules="[{ required: true, message: 'Please input name' }]"
      >
        <a-input v-model:value="currentAppGroup.name" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import { globalStore } from '@/stores/global'
import { addWorkflowGroup, editWorkflowGroup } from '@/service/api/workflowGroupApi'

const emit = defineEmits(['onSubmitSuccess'])
const emptyAppGroup = {
  id: null,
  namespaceCode: '',
  code: '',
  name: ''
}

const title = ref('新建分组')
const formRef = ref()
const saveMode = ref('')
const visibility = ref(false)
const currentAppGroup = reactive({})

const openModal = (appGroup) => {
  if (appGroup) {
    saveMode.value = 'edit'
    title.value = '编辑分组'
    Object.assign(currentAppGroup, appGroup)
  } else {
    saveMode.value = 'add'
    title.value = '新建分组'
    Object.assign(currentAppGroup, emptyAppGroup)
  }
  visibility.value = true
}

const handleSave = async () => {
  if (saveMode.value === 'add') {
    const namespaceCode = globalStore.getNamespaceCode()
    await addWorkflowGroup({ ...currentAppGroup, namespaceCode })
  } else {
    await editWorkflowGroup({ workflowGroupId: currentAppGroup.id }, currentAppGroup)
  }
  visibility.value = false
  formRef.value.resetFields()
  message.success('操作成功')
  emit('onSubmitSuccess')
}

defineExpose({ openModal })
</script>
