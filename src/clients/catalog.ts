import { InstanceOptions, IOContext, JanusClient, RequestTracingConfig } from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { AuthMethod } from '../typings/tokens'
import { OrderFormConfiguration } from '../typings/orderForm'

export class Catalog extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getSkuById(skuId: string, authMethod: AuthMethod = 'AUTH_TOKEN', tracingConfig?: RequestTracingConfig) {
    const metric = 'catalog-getSkuMetric'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(this.routes.getSkuById(skuId), {
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

    return this.http.post(this.routes.changeNotification(sellerId, skuId), {
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
    {
      SellerId,
      Name,
      Email,
      Description = '',
      ExchangeReturnPolicy = '',
      DeliveryPolicy = '',
      UseHybridPaymentOptions,
      UserName = '',
      Password = '',
      SecurityPrivacyPolicy = '',
      CNPJ = '',
      CSCIdentification,
      ArchiveId = '',
      UrlLogo = '',
      ProductCommissionPercentage,
      FreightCommissionPercentage,
      FulfillmentEndpoint,
      CatalogSystemEndpoint,
      IsActive = true,
      FulfillmentSellerId = '',
      SellerType = 1,
      IsBetterScope = false,
    }: SellerInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'catalog-createSeller'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(
      this.routes.seller(SellerId),
      {
        ArchiveId,
        CNPJ,
        CSCIdentification,
        CatalogSystemEndpoint,
        DeliveryPolicy,
        Description,
        Email,
        ExchangeReturnPolicy,
        FreightCommissionPercentage,
        FulfillmentEndpoint,
        FulfillmentSellerId,
        IsActive,
        IsBetterScope,
        Name,
        Password,
        ProductCommissionPercentage,
        SecutityPrivacyPolicy: SecurityPrivacyPolicy,
        SellerId,
        SellerType,
        UrlLogo,
        UseHybridPaymentOptions,
        UserName,
      },
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

  private get routes() {
    const baseURL = '/api/catalog'
    const baseURLLegacy = '/api/catalog_system'

    return {
      getSkuById: (skuId: string) => `${baseURL}/pvt/stockkeepingunit/${skuId}`,
      changeNotification: (sellerId: string, skuId: string) =>
        `${baseURLLegacy}/pvt/skuseller/changenotification/${sellerId}/${skuId}`,
      seller: (sellerId: string) => `${baseURLLegacy}/pvt/seller/${sellerId}`,
    }
  }
}
