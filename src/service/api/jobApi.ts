// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询任务列表 GET /api/v1/jobs/ */
export async function listJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listJobParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOJobInfoQueryResponseDTO>(`/api/v1/jobs/`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param']
    },
    ...(options || {})
  })
}

/** 新增任务 POST /api/v1/jobs/ */
export async function addJob(body: API.JobInfoAddRequestDTO, options?: { [key: string]: any }) {
  return request<API.ResponseWrapperLong>(`/api/v1/jobs/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 查询任务详情 GET /api/v1/jobs/${param0} */
export async function getJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getJobParams,
  options?: { [key: string]: any }
) {
  const { jobId: param0, ...queryParams } = params
  return request<API.ResponseWrapperJobInfoDetailResponseDTO>(`/api/v1/jobs/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 编辑任务 PUT /api/v1/jobs/${param0} */
export async function editJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editJobParams,
  body: API.JobInfoEditRequestDTO,
  options?: { [key: string]: any }
) {
  const { jobId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/jobs/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}

/** 删除任务 DELETE /api/v1/jobs/${param0} */
export async function removeJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.removeJobParams,
  options?: { [key: string]: any }
) {
  const { jobId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/jobs/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {})
  })
}

/** 运行任务 POST /api/v1/jobs/${param0}/instance */
export async function runJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.runJobParams,
  body: API.JobRunRequestDTO,
  options?: { [key: string]: any }
) {
  const { jobId: param0, ...queryParams } = params
  return request<API.ResponseWrapperLong>(`/api/v1/jobs/${param0}/instance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}

/** 修改任务启用状态 PATCH /api/v1/jobs/${param0}/status */
export async function switchJobStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.switchJobStatusParams,
  body: API.JobSwitchRequestDTO,
  options?: { [key: string]: any }
) {
  const { jobId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/jobs/${param0}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}
