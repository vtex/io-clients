import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { checkSellerInformation } from '../utils/seller'
import { AuthMethod } from '../typings/tokens'
import { GetSkuResponse, Seller } from '../typings/catalog'

const baseURL = '/api/catalog'
const baseURLLegacy = '/api/catalog_system'

const routes = {
  productsAndSkus: `${baseURLLegacy}/pvt/products/GetProductAndSkuIds`,
  getSkuById: (skuId: string) => `${baseURL}/pvt/stockkeepingunit/${skuId}`,
  changeNotification: (sellerId: string, skuId: string) =>
    `${baseURLLegacy}/pvt/skuseller/changenotification/${sellerId}/${skuId}`,
  seller: (sellerId: string) => `${baseURLLegacy}/pvt/seller/${sellerId}`,
  sellerList: `${baseURLLegacy}/pvt/seller/list`,
}

export class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getProductsAndSkus(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getProductsAndSkus'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get(routes.productsAndSkus, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public getSkuById(
    skuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getSkuMetric'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<GetSkuResponse>(routes.getSkuById(skuId), {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public changeNotification(
    {
      sellerId,
      sellerSkuId,
      authMethod = 'AUTH_TOKEN',
    }: ChangeNotificationArgs,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-changeNotification'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(
      routes.changeNotification(sellerId, sellerSkuId),
      {},
      {
        headers: token
          ? {
              VtexIdclientAutCookie: token,
            }
          : {},
        metric,
        tracing: createTracing(metric, tracingConfig),
      }
    )
  }

  public createSeller(
    seller: Seller,
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

  public getSellerList(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getSellerList'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<Seller[]>(routes.sellerList, {
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

interface ChangeNotificationArgs {
  sellerId: string
  sellerSkuId: string
  authMethod?: AuthMethod
}
