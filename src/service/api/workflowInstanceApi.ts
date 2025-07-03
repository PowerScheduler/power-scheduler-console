// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询工作流实例详情 GET /api/workflowInstances/detail */
export async function getWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperWorkflowInstanceDetailResponseDTO>(
    `/api/workflowInstances/detail`,
    {
      method: 'GET',
      params: {
        ...params
      },
      ...(options || {})
    }
  )
}

/** 查询工作流实例列表 GET /api/workflowInstances/list */
export async function listWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOWorkflowInstanceQueryResponseDTO>(
    `/api/workflowInstances/list`,
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

/** 查询工作流节点实例进度 GET /api/workflowInstances/queryProgress */
export async function queryWorkflowNodeInstanceProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryWorkflowNodeInstanceProgressParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOJobProgressQueryResponseDTO>(
    `/api/workflowInstances/queryProgress`,
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

/** 重跑任务 POST /api/workflowInstances/retry */
export async function retryWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retryWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/workflowInstances/retry`, {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 终止任务 POST /api/workflowInstances/terminate */
export async function terminateWorkflowInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.terminateWorkflowInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperUnit>(`/api/workflowInstances/terminate`, {
    method: 'POST',
    params: {
      ...params
    },
    ...(options || {})
  })
}
