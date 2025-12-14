// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查工作流分组 GET /api/v1/workflowGroups/ */
export async function listWorkflowGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listWorkflowGroupParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOWorkflowGroupQueryResponseDTO>(
    `/api/v1/workflowGroups/`,
    {
      method: 'GET',
      params: {
        ...params,
        param: undefined,
        ...params['param']
      },
      ...(options || {})
    }
  )
}

/** 新建工作流分组 POST /api/v1/workflowGroups/ */
export async function addWorkflowGroup(
  body: API.WorkflowGroupAddRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/v1/workflowGroups/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 编辑工作流分组 PUT /api/v1/workflowGroups/${param0} */
export async function editWorkflowGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editWorkflowGroupParams,
  body: API.WorkflowGroupEditRequestDTO,
  options?: { [key: string]: any }
) {
  const { workflowGroupId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/workflowGroups/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}
