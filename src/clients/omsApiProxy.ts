import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

/**
 * Used to perform calls on OMS API in the VTEX infrastructure, to which you must declare an outbound policy.
 *
 * Policy:
 * {
 *   "name": "vtex.oms-api-proxy:oms-order-information"
 * },
 *
 */
export class OMSProxy extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.oms-api-proxy@0.x', context, options)
  }

  public orders(id: string): Promise<string> {
    return this.http.get(`/orders/${id}`, {
      metric: 'orders-get',
    })
  }

  public orderFormId(id: string): Promise<string> {
    return this.http.get(`orders/${id}/orderFormId`, {
      metric: 'orderFormId-get',
    })
  }

  public customData(id: string, body: CustomData): Promise<string> {
    return this.http.post(`orders/${id}/customData`, body, {
      metric: 'customData-post',
    })
  }

  public register(body: CustomDataRegistry): Promise<string> {
    return this.http.post('register', body, {
      metric: 'registerCustomData-post',
    })
  }
}

interface CustomData {
  value: string
  fieldName: string
}

interface CustomDataRegistry {
  fields: string[]
  major: number
}
