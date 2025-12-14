// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询工作流实例列表 GET /api/v1/workflowInstances/ */
export async function listWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOWorkflowInstanceQueryResponseDTO>(
    `/api/v1/workflowInstances/`,
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

/** 查询工作流实例详情 GET /api/v1/workflowInstances/${param0} */
export async function getWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  const { workflowInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperWorkflowInstanceDetailResponseDTO>(
    `/api/v1/workflowInstances/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {})
    }
  )
}

/** 查询工作流节点实例进度 GET /api/v1/workflowInstances/${param0}/progress */
export async function queryWorkflowNodeInstanceProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryWorkflowNodeInstanceProgressParams,
  options?: { [key: string]: any }
) {
  const { workflowInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperPageDTOJobProgressQueryResponseDTO>(
    `/api/v1/workflowInstances/${param0}/progress`,
    {
      method: 'GET',
      params: {
        ...queryParams,
        param: undefined,
        ...queryParams['param']
      },
      ...(options || {})
    }
  )
}

/** 重跑任务 POST /api/v1/workflowInstances/${param0}/retry */
export async function retryWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retryWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  const { workflowInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperLong>(`/api/v1/workflowInstances/${param0}/retry`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 终止任务 POST /api/v1/workflowInstances/${param0}/terminate */
export async function terminateWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.terminateWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  const { workflowInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/workflowInstances/${param0}/terminate`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {})
  })
}
