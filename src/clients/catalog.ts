import type {
  InstanceOptions,
  IOContext,
  RequestTracingConfig,
} from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { checkSellerInformation } from '../utils/seller'
import type { AuthMethod } from '../typings/tokens'
import type {
  GetSkuResponse,
  GetSkuContextResponse,
  Seller,
  Category,
  GetBrandResponse,
} from '../typings/catalog'
import { getRequestConfig } from '../utils/request'

const baseURL = '/api/catalog'
const baseURLLegacy = '/api/catalog_system'

const routes = {
  productsAndSkus: (from: number, to: number) =>
    `${baseURLLegacy}/pvt/products/GetProductAndSkuIds?_from=${from}&_to=${to}`,
  getCategoryById: (categoryId: string) =>
    `${baseURL}/pvt/category/${categoryId}`,
  getSkuById: (skuId: string) => `${baseURL}/pvt/stockkeepingunit/${skuId}`,
  getSkuContext: (skuId: string) =>
    `${baseURLLegacy}/pvt/sku/stockkeepingunitbyid/${skuId}`,
  changeNotification: (sellerId: string, skuId: string) =>
    `${baseURLLegacy}/pvt/skuseller/changenotification/${sellerId}/${skuId}`,
  seller: (sellerId: string) => `${baseURLLegacy}/pvt/seller/${sellerId}`,
  sellerList: `${baseURLLegacy}/pvt/seller/list`,
  getBrandById: (brandId: string) => `${baseURLLegacy}/pvt/brand/${brandId}`,
}

export class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getCategoryById(
    categoryId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ): Promise<Category | undefined> {
    const metric = 'catalog-getCategoryMetric'

    return this.http.get<Category>(
      routes.getCategoryById(categoryId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public getProductsAndSkus(
    from = 1,
    to = 20,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getProductsAndSkus'

    return this.http.get(
      routes.productsAndSkus(from, to),
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

  public getSkuContext(
    skuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getSkuContextMetric'

    return this.http.get<GetSkuContextResponse>(
      routes.getSkuContext(skuId),
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

  public seller(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-seller'

    return this.http.get<Seller>(
      routes.seller(id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public getBrandById(
    brandId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-getBrandMetric'

    return this.http.get<GetBrandResponse>(
      routes.getBrandById(brandId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}

interface ChangeNotificationArgs {
  sellerId: string
  sellerSkuId: string
  authMethod?: AuthMethod
}
