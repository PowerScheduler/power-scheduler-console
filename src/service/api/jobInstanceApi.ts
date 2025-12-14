// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询任务实例列表 GET /api/v1/jobInstances/ */
export async function listJobInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listJobInstanceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOJobInstanceQueryResponseDTO>(`/api/v1/jobInstances/`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param']
    },
    ...(options || {})
  })
}

/** 查询任务实例详情 GET /api/v1/jobInstances/${param0} */
export async function getJobInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getJobInstanceParams,
  options?: { [key: string]: any }
) {
  const { jobInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperJobInstanceDetailResponseDTO>(
    `/api/v1/jobInstances/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {})
    }
  )
}

/** 查询任务错误信息 GET /api/v1/jobInstances/${param0}/errorMessage */
export async function getErrorMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getErrorMessageParams,
  options?: { [key: string]: any }
) {
  const { jobInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperString>(`/api/v1/jobInstances/${param0}/errorMessage`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 查询任务进度 GET /api/v1/jobInstances/${param0}/progress */
export async function queryProgress(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryProgressParams,
  options?: { [key: string]: any }
) {
  const { jobInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperPageDTOJobProgressQueryResponseDTO>(
    `/api/v1/jobInstances/${param0}/progress`,
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

/** 重跑任务 POST /api/v1/jobInstances/${param0}/retry */
export async function retryJobInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.retryJobInstanceParams,
  options?: { [key: string]: any }
) {
  const { jobInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperLong>(`/api/v1/jobInstances/${param0}/retry`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 终止任务 POST /api/v1/jobInstances/${param0}/terminate */
export async function terminateJobInstance(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.terminateJobInstanceParams,
  options?: { [key: string]: any }
) {
  const { jobInstanceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/jobInstances/${param0}/terminate`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {})
  })
}
