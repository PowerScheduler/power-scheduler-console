// @ts-ignore
/* eslint-disable */
import request from '@/utils/request'

/** 查询基本信息 GET /api/v1/dashboard/${param0}/basicInfo */
export async function queryBasicInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryBasicInfoParams,
  options?: { [key: string]: any }
) {
  const { namespaceCode: param0, ...queryParams } = params
  return request<API.ResponseWrapperDashboardBasicInfoQueryResponseDTO>(
    `/api/v1/dashboard/${param0}/basicInfo`,
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

/** 查询统计信息 GET /api/v1/dashboard/${param0}/statisticsInfo */
export async function queryStatisticsInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryStatisticsInfoParams,
  options?: { [key: string]: any }
) {
  const { namespaceCode: param0, ...queryParams } = params
  return request<API.ResponseWrapperDashboardStatisticsInfoQueryResponseDTO>(
    `/api/v1/dashboard/${param0}/statisticsInfo`,
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
