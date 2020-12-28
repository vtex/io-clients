import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { AuthMethod } from '../typings/tokens'
import {
  CancelResponse,
  ListOrdersResponse,
  NotificationInput,
  NotificationResponse,
  OrderDetailResponse,
} from '../typings/oms'
import { OrderFormConfiguration } from '../typings/orderForm'
import { getRequestConfig } from '../utils/request'

const baseURL = '/api/oms'

const routes = {
  orders: `${baseURL}/pvt/orders`,
  lastOrder: `${baseURL}/user/orders/last`,
  order: (id: string) => `${baseURL}/pvt/orders/${id}`,
  notification: (id: string) => `${baseURL}/pvt/orders/${id}/invoice`,
  cancel: (id: string) => `${baseURL}/pvt/orders/${id}/cancel`,
}

export class OMS extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  public listOrders(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-listOrders'

    return this.http.get<ListOrdersResponse>(
      routes.orders,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public userLastOrder(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-userLastOrder'

    return this.http.get<OrderFormConfiguration>(
      routes.lastOrder,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public order(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-order'

    return this.http.get<OrderDetailResponse>(
      routes.order(id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public orderNotification(
    id: string,
    body: NotificationInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-orderNotification'

    return this.http.post<NotificationResponse>(
      routes.notification(id),
      body,
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }

  public cancelOrder(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-cancelOrder'

    return this.http.post<CancelResponse>(
      routes.cancel(id),
      getRequestConfig(this.context, authMethod, metric, tracingConfig)
    )
  }
}
