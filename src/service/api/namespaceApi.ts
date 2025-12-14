// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询命名空间列表 GET /api/v1/namespaces/ */
export async function listNamespace(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listNamespaceParams,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperPageDTONamespaceQueryResponseDTO>(`/api/v1/namespaces/`, {
    method: 'GET',
    params: {
      ...params,
      param: undefined,
      ...params['param']
    },
    ...(options || {})
  })
}

/** 新增命名空间 POST /api/v1/namespaces/ */
export async function addNamespace(
  body: API.NamespaceAddRequestDTO,
  options?: { [key: string]: any }
) {
  return request<API.ResponseWrapperLong>(`/api/v1/namespaces/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    ...(options || {})
  })
}

/** 编辑命名空间 PUT /api/v1/namespaces/${param0} */
export async function editNamespace(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.editNamespaceParams,
  body: API.NamespaceEditRequestDTO,
  options?: { [key: string]: any }
) {
  const { namespaceId: param0, ...queryParams } = params
  return request<API.ResponseWrapperUnit>(`/api/v1/namespaces/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    params: { ...queryParams },
    data: body,
    ...(options || {})
  })
}
