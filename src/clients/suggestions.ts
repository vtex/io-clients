import {
  ExternalClient,
  InstanceOptions,
  IOContext,
  RequestTracingConfig,
} from '@vtex/api'

import { AuthMethod } from '../typings/tokens'
import {
  Suggestion,
  SuggestionRequest,
  SuggestionsResponse,
} from '../typings/suggestions'
import { getRequestConfig } from '../utils/request'

const routes = {
  sellerSkuId: (sellerId: string, sellerSkuId: string) =>
    `/${sellerId}/${sellerSkuId}`,
  versions: (sellerId: string, sellerSkuId: string) =>
    `/${sellerId}/${sellerSkuId}/versions`,
  versionById: (sellerId: string, sellerSkuId: string, version: string) =>
    `/${sellerId}/${sellerSkuId}/versions/${version}`,
}

export class Suggestions extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`https://api.vtex.com/${ctx.account}/suggestions/`, ctx, {
      ...options,
    })
  }

  public getAllSuggestions(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-getAllSuggestions'

    return this.http.get<SuggestionsResponse>(
      '',
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public getSuggestionById(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-getSuggestionById'

    return this.http.get<Suggestion>(
      routes.sellerSkuId(sellerId, sellerSkuId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public sendSkuSuggestion(
    body: SuggestionRequest,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-sendSkuSuggestion'
    const { SellerId: sellerId, SellerStockKeepingUnitId: sellerSkuId } = body

    return this.http.put(
      routes.sellerSkuId(sellerId, sellerSkuId),
      body,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public deleteSkuSuggestion(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'

    return this.http.delete(
      routes.sellerSkuId(sellerId, sellerSkuId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public getAllVersions(
    sellerId: string,
    sellerSkuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'

    return this.http.get(
      routes.versions(sellerId, sellerSkuId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public getVersionById(
    sellerId: string,
    sellerSkuId: string,
    version: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'suggestions-deleteSkuSuggestion'

    return this.http.get(
      routes.versionById(sellerId, sellerSkuId, version),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}
