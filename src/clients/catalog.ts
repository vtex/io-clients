import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { checkSellerInformation } from '../utils/seller'
import { AuthMethod } from '../typings/tokens'
import { OrderFormConfiguration } from '../typings/orderForm'

const baseURL = '/api/catalog'
const baseURLLegacy = '/api/catalog_system'

const routes = {
  getSkuById: (skuId: string) => `${baseURL}/pvt/stockkeepingunit/${skuId}`,
  changeNotification: (sellerId: string, skuId: string) =>
    `${baseURLLegacy}/pvt/skuseller/changenotification/${sellerId}/${skuId}`,
  seller: (sellerId: string) => `${baseURLLegacy}/pvt/seller/${sellerId}`,
}

export class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getSkuById(skuId: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'catalog-getSkuMetric'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(routes.getSkuById(skuId), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  // eslint-disable-next-line max-params
  public changeNotification(
    sellerId: string,
    skuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-changeNotification'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(routes.changeNotification(sellerId, skuId), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public createSeller(
    seller: SellerInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createSeller'
    const token = getAuthToken(this.context, authMethod)

    const sellerInfo = checkSellerInformation(seller)

    return this.http.post(routes.seller(sellerInfo.SellerId), sellerInfo, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
