import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import { AuthMethod } from '../typings/tokens'
import {
  CancelResponse,
  ListOrdersResponse,
  NotificationInput,
  NotificationResponse,
  OrderDetailResponse,
} from '../typings/oms'
import { OrderFormConfiguration } from '../typings/orderForm'

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

  public userLastOrder(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-userLastOrder'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderFormConfiguration>(routes.lastOrder, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public order(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-order'
    const token = getAuthToken(this.context, authMethod)

    return this.http.get<OrderDetailResponse>(routes.order(id), {
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
  public orderNotification(
    id: string,
    body: NotificationInput,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-orderNotification'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post<NotificationResponse>(routes.notification(id), body, {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public cancelOrder(
    id: string,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'oms-cancelOrder'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post<CancelResponse>(routes.cancel(id), {
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

interface Range {
  startDate: string
  endDate: string
}
