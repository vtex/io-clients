import {
  InstanceOptions,
  IOContext,
  JanusClient,
  RequestTracingConfig,
} from '@vtex/api'

import { getAuthToken } from '../utils/authToken'
import { createTracing } from '../utils/tracing'
import {
  OrderForm,
  OrderFormClientPreferencesData,
  AuthMethod,
  OrderFormConfiguration,
  SimulationOrderForm,
  SimulationPayload,
  SingleCustomData,
} from '../typings'

const baseURL = '/api/checkout'
const routes = {
  addItem: (orderFormId: string, queryString: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/items${queryString}`,
  cancelOrder: (orderFormId: string) =>
    `${baseURL}/pub/orders/${orderFormId}/user-cancel-request`,
  orderFormCustomData: (orderFormId: string, appId: string, field: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/customData/${appId}/${field}`,
  updateItems: (orderFormId: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/items/update`,
  profile: (orderFormId: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/profile`,
  attachmentsData: (orderFormId: string, field: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/attachments/${field}`,
  assemblyOptions: (
    orderFormId: string,
    itemId: string | number,
    assemblyOptionsId: string
  ) =>
    `${baseURL}/pub/orderForm/${orderFormId}/items/${itemId}/assemblyOptions/${assemblyOptionsId}`,
  checkin: (orderFormId: string) =>
    `${baseURL}/pub/orderForm/${orderFormId}/checkIn`,
  orderForm: (orderFormId?: string) =>
    `${baseURL}/pub/orderForm/${orderFormId ?? ''}`,
  orders: `${baseURL}/pub/orders`,
  simulation: (queryString: string) =>
    `${baseURL}/pub/orderForms/simulation${queryString}`,
  changeToAnonymousUser: (orderFormId: string) =>
    `/checkout/changeToAnonymousUser/${orderFormId}`,
  orderFormConfiguration: `${baseURL}/pvt/configuration/orderForm`,
  singleCustomData: (
    orderFormId: string,
    appId: string,
    appFieldName: string
  ) =>
    `${baseURL}/pub/orderForm/${orderFormId}/customData/${appId}/${appFieldName}`,
}

export class Checkout extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
    })
  }

  private getRequestConfig(
    authMethod: AuthMethod,
    metric: string,
    tracingConfig?: RequestTracingConfig
  ) {
    const token = getAuthToken(this.context, authMethod)

    return {
      headers: token
        ? {
            VtexIdclientAutCookie: token,
          }
        : {},
      metric,
      tracing: createTracing(metric, tracingConfig),
    }
  }

  public getOrderFormConfiguration(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-getOrderFormConfiguration'

    return this.http.get<OrderFormConfiguration>(
      routes.orderFormConfiguration,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public setOrderFormConfiguration(
    body: OrderFormConfiguration,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setOrderFormConfiguration'
    const token = getAuthToken(this.context, authMethod)

    return this.http.post(
      routes.orderFormConfiguration,
      body,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public setSingleCustomData(
    orderFormId: string,
    customData: SingleCustomData,
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setSingleCustomData'

    const { appId, appFieldName, value } = customData

    return this.http.put(
      routes.singleCustomData(orderFormId, appId, appFieldName),
      { value },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public addItem(
    orderFormId: string,
    items: any,
    queryString: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-addItem'

    return this.http.post<OrderForm>(
      routes.addItem(orderFormId, queryString),
      { orderItems: items },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public cancelOrder(
    orderFormId: string,
    reason: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-cancelOrder'

    return this.http.post(
      routes.cancelOrder(orderFormId),
      { reason },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public setOrderFormCustomData(
    orderFormId: string,
    appId: string,
    field: string,
    value: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setOrderFormCustomData'

    return this.http.put(
      routes.orderFormCustomData(orderFormId, appId, field),
      { value },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateItems(
    orderFormId: string,
    orderItems: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateItems'

    return this.http.post(
      routes.updateItems(orderFormId),
      { orderItems },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormIgnoreProfile(
    orderFormId: string,
    ignoreProfileData: boolean,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormIgnoreProfile'

    return this.http.patch(
      routes.profile(orderFormId),
      { ignoreProfileData },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormPayment(
    orderFormId: string,
    payments: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormPayment'

    return this.http.post(
      routes.attachmentsData(orderFormId, 'paymentData'),
      { payments },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormProfile(
    orderFormId: string,
    fields: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormProfile'

    return this.http.post(
      routes.attachmentsData(orderFormId, 'clientProfileData'),
      fields,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormShipping(
    orderFormId: string,
    shipping: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormShipping'

    this.http.post(
      routes.attachmentsData(orderFormId, 'shippingData'),
      shipping,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormMarketingData(
    orderFormId: string,
    marketingData: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormMarketingData'

    return this.http.post(
      routes.attachmentsData(orderFormId, 'marketingData'),
      marketingData,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormClientPreferencesData(
    orderFormId: string,
    clientPreferencesData: OrderFormClientPreferencesData,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormClientPreferencesData'
    // The API default value of `optinNewsLetter` is `null`, but it doesn't accept a POST with its value as `null`
    const filteredClientPreferencesData =
      clientPreferencesData.optinNewsLetter === null
        ? { locale: clientPreferencesData.locale }
        : clientPreferencesData

    return this.http.post(
      routes.attachmentsData(orderFormId, 'clientPreferencesData'),
      filteredClientPreferencesData,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public addAssemblyOptions(
    orderFormId: string,
    itemId: string | number,
    assemblyOptionsId: string,
    body: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-addAssemblyOptions'

    return this.http.post<OrderForm>(
      routes.assemblyOptions(orderFormId, itemId, assemblyOptionsId),
      body,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public async removeAssemblyOptions(
    orderFormId: string,
    itemId: string | number,
    assemblyOptionsId: string,
    body: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-removeAssemblyOptions'

    return this.http.delete<OrderForm>(
      routes.assemblyOptions(orderFormId, itemId, assemblyOptionsId),
      {
        ...this.getRequestConfig(authMethod, metric, tracingConfig),
        data: body,
      }
    )
  }

  // eslint-disable-next-line max-params
  public updateOrderFormCheckin(
    orderFormId: string,
    checkinPayload: any,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-updateOrderFormCheckin'

    return this.http.post(
      routes.checkin(orderFormId),
      checkinPayload,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public orderForm(
    orderFormId?: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-orderForm'

    return this.http.post<OrderForm>(
      routes.orderForm(orderFormId),
      { expectedOrderFormSections: ['items'] },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public orderFormRaw(
    authMethod: AuthMethod = 'AUTH_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-orderForm'

    return this.http.post<OrderForm>(
      routes.orderForm(),
      { expectedOrderFormSections: ['items'] },
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public newOrderForm(
    orderFormId?: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-newOrderForm'

    return this.http.post(
      routes.orderForm(orderFormId),
      undefined,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public changeToAnonymousUser(
    orderFormId?: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-change-to-anonymous'

    if (!orderFormId) {
      throw new Error('Missing orderFormId. Use withOrderFormId directive.')
    }

    return this.http.get(
      routes.changeToAnonymousUser(orderFormId),
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  public orders(
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-orders'

    return this.http.get(
      routes.orders,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }

  // eslint-disable-next-line max-params
  public simulation(
    simulation: SimulationPayload,
    queryString: string,
    authMethod: AuthMethod = 'STORE_TOKEN',
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-simulation'

    return this.http.post<SimulationOrderForm>(
      routes.simulation(queryString),
      simulation,
      this.getRequestConfig(authMethod, metric, tracingConfig)
    )
  }
}
