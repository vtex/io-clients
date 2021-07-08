import type {
  RequestTracingConfig,
  IOContext,
  InstanceOptions,
} from '@vtex/api'
import { JanusClient } from '@vtex/api'

import type { AuthMethod } from '../typings/tokens'
import type {
  LogisticOutput,
  LogisticPickupPoint,
  InventoryBySkuResponse,
} from '../typings/logistics'
import { getRequestConfig } from '../utils/request'

const baseURL = '/api/logistics'

const routes = {
  docks: (dockId: string) => `${baseURL}/pvt/configuration/docks/${dockId}`,
  shipping: `${baseURL}/pub/shipping/configuration`,
  nearPickupPoints: (lat: string, long: string, maxDistance: number) =>
    `${baseURL}/pvt/configuration/pickuppoints/_search?&page=1&pageSize=100&lat=${lat}&lon=${long}&maxDistance=${maxDistance}`,
  pickUpById: (id: string) => `${baseURL}/pvt/configuration/pickuppoints/${id}`,
  pickupPoints: `${baseURL}/pvt/configuration/pickuppoints/_search`,
  listInventoryBySku: (skuId: string) =>
    `${baseURL}/pvt/inventory/skus/${skuId}`,
}

export class Logistics extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public getDockById(
    dockId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-getDockById'

    return this.http.get(
      routes.docks(dockId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public pickupById(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-pickupById'

    return this.http.get<LogisticPickupPoint>(
      routes.pickUpById(id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public listPickupPoints(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-listPickupPoints'

    return this.http.get<LogisticOutput>(
      routes.pickupPoints,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public nearPickupPoints(
    lat: string,
    long: string,
    maxDistance = 50,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-nearPickupPoints'

    return this.http.get<LogisticOutput>(
      routes.nearPickupPoints(lat, long, maxDistance),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public shipping(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-shipping'

    return this.http.get<LogisticPickupPoint>(
      routes.shipping,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public listInventoryBySku(
    skuId: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'logistics-listInventoryBySku'

    return this.http.get<InventoryBySkuResponse>(
      routes.listInventoryBySku(skuId),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}
