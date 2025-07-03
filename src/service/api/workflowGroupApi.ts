// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 新建工作流分组 POST /api/workflowGroups/add */
export async function addWorkflowGroup(
  body: API.WorkflowGroupAddRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/workflowGroups/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 编辑工作流分组 POST /api/workflowGroups/edit */
export async function editWorkflowGroup(
  body: API.WorkflowGroupEditRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperUnit>(`/api/workflowGroups/edit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 查工作流分组 POST /api/workflowGroups/list */
export async function listWorkflowGroup(
  body: API.WorkflowGroupQueryRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOWorkflowGroupQueryResponseDTO>(
    `/api/workflowGroups/list`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: body,
      ...(options || {})
    }
  )
}
