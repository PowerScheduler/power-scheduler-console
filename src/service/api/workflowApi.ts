// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询工作流列表 GET /api/v1/workflows/ */
export async function listWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listWorkflowParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOWorkflowQueryResponseDTO>(`/api/v1/workflows/`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param']
    },
    ...(options || {})
  })
}

/** 新增工作流 POST /api/v1/workflows/ */
export async function addWorkflow(
  body: API.WorkflowAddRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/v1/workflows/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 查询工作流详情 GET /api/v1/workflows/${param0} */
export async function getWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWorkflowParams,
  options?: { [key: string]: any }
) {
  const { workflowId: param0, ...queryParams } = params
  return request<API.ResponseWrapperWorkflowDetailResponseDTO>(`/api/v1/workflows/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 编辑工作流 PUT /api/v1/workflows/${param0} */
export async function editWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editWorkflowParams,
  body: API.WorkflowEditRequestDTO,
  options?: { [key: string]: any }
) {
  const { workflowId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/workflows/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}

/** 删除工作流 DELETE /api/v1/workflows/${param0} */
export async function deleteWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteWorkflowParams,
  options?: { [key: string]: any }
) {
  const { workflowId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/workflows/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 运行工作流 POST /api/v1/workflows/${param0}/run */
export async function runWorkflow(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.runWorkflowParams,
  body: API.WorkflowRunRequestDTO,
  options?: { [key: string]: any }
) {
  const { workflowId: param0, ...queryParams } = params
  return request<API.ResponseWrapperLong>(`/api/v1/workflows/${param0}/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}

/** 修改工作流启用状态 PATCH /api/v1/workflows/${param0}/status */
export async function switchWorkflowStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.switchWorkflowStatusParams,
  body: API.WorkflowSwitchRequestDTO,
  options?: { [key: string]: any }
) {
  const { workflowId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/workflows/${param0}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}
