<template>
  <a-modal v-model:open="visibility" :title="title" @ok="handleSave">
    <a-form name="basic" ref="formRef" :model="currentAppGroup">
      <a-form-item
        label="应用编码"
        name="code"
        :rules="[{ required: true, message: 'Please input code' }]"
      >
        <a-input v-model:value="currentAppGroup.code" :disabled="saveMode == 'edit'" />
      </a-form-item>
      <a-form-item
        label="应用名称"
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
import { addAppGroup, editAppGroup } from '@/service/api/appGroupApi'
import { globalStore } from '@/stores/global'

const emit = defineEmits(['onSubmitSuccess'])
const emptyAppGroup = {
  id: null,
  namespaceCode: '',
  code: '',
  name: ''
}

const title = ref('新建应用')
const formRef = ref()
const saveMode = ref('')
const visibility = ref(false)
const currentAppGroup = reactive({})

const openModal = (appGroup) => {
  if (appGroup) {
    saveMode.value = 'edit'
    title.value = '编辑应用'
    Object.assign(currentAppGroup, appGroup)
  } else {
    saveMode.value = 'add'
    title.value = '新建应用'
    Object.assign(currentAppGroup, emptyAppGroup)
  }
  visibility.value = true
}

const handleSave = async () => {
  if (saveMode.value === 'add') {
    const namespaceCode = globalStore.getNamespaceCode()
    await addAppGroup({ ...currentAppGroup, namespaceCode })
  } else {
    await editAppGroup({ appGroupId: currentAppGroup.id }, currentAppGroup)
  }
  visibility.value = false
  formRef.value.resetFields()
  message.success('操作成功')
  emit('onSubmitSuccess')
}

defineExpose({ openModal })
</script>
