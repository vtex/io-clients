import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { checkSellerInformation } from '../utils/seller'
import { AuthMethod } from '../typings/tokens'
import { GetSkuResponse, Seller } from '../typings/catalog'
import { getRequestConfig } from '../utils/request'

const baseURL = '/api/catalog'
const baseURLLegacy = '/api/catalog_system'

const routes = {
  productsAndSkus: `${baseURLLegacy}/pvt/products/GetProductAndSkuIds`,
  getSkuById: (skuId: string) => `${baseURL}/pvt/stockkeepingunit/${skuId}`,
  changeNotification: (sellerId: string, skuId: string) =>
    `${baseURLLegacy}/pvt/skuseller/changenotification/${sellerId}/${skuId}`,
  search: (query: string) => `${baseURLLegacy}/pub/products/search/${query}`,
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

    return this.http.get(
      routes.productsAndSkus,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public getSkuById(
    skuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getSkuMetric'

    return this.http.get<GetSkuResponse>(
      routes.getSkuById(skuId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
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

    return this.http.post(
      routes.changeNotification(sellerId, sellerSkuId),
      {},
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public createSeller(
    seller: Seller,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createSeller'
    const sellerInfo = checkSellerInformation(seller)

    return this.http.post(
      routes.seller(sellerInfo.SellerId),
      sellerInfo,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public search(
    query: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-search'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get(routes.search(query), {
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

    return this.http.get<Seller[]>(
      routes.sellerList,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}

interface ChangeNotificationArgs {
  sellerId: string
  sellerSkuId: string
  authMethod?: AuthMethod
}
