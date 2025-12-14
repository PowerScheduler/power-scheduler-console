// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询应用分组 GET /api/v1/appGroups/ */
export async function listAppGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAppGroupParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTOAppGroupQueryResponseDTO>(`/api/v1/appGroups/`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param']
    },
    ...(options || {})
  })
}

/** 新增应用分组 POST /api/v1/appGroups/ */
export async function addAppGroup(
  body: API.AppGroupAddRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/v1/appGroups/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 编辑应用分组 PUT /api/v1/appGroups/${param0} */
export async function editAppGroup(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editAppGroupParams,
  body: API.AppGroupEditRequestDTO,
  options?: { [key: string]: any }
) {
  const { appGroupId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/appGroups/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}
