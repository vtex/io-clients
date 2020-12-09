export interface SingleCustomData {
  appId: string
  appFieldName: string
  value: string
}

export interface CheckoutAddress {
  addressType: string
  receiverName: string | null
  addressId: string
  postalCode: string
  city: string
  state: string
  country: string
  street: string
  number: string
  neighborhood: string
  complement: string
  reference: string | null
  geoCoordinates: [number, number]
}

export interface CheckoutAssemblyItem {
  id: string
  inputValues: Record<string, string>
}

export interface CheckoutAttachmentOffering {
  name: string
  required: boolean
  schema: Record<string, unknown>
}

export interface InstallmentOption {
  paymentSystem: string
  paymentName: string
  paymentGroupName: string
  value: number
  bin: string | null
  installments: SimulationInstallment[]
}

export interface SimulationInstallment {
  value: number
  interestRate: number
  total: number
  count: number
}

export interface AssemblyOptionInput {
  id: string
  quantity: number
  assemblyId: string
  seller: string
  inputValues: Record<string, string>
  options?: AssemblyOptionInput[]
}

export interface PayloadItem {
  id: string
  quantity: number
  seller: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
}

export interface SimulationPayload {
  country?: string
  items: PayloadItem[]
  postalCode?: string
  isCheckedIn?: boolean
  priceTables?: string[]
  marketingData?: Record<string, string>
  geoCoordinates?: [string | number, string | number]
  shippingData?: any
}

export interface SLAItem {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: Array<{
    courierId: string
    warehouseId: string
    dockId: string
    courierName: string
    quantity: number
  }>
  shippingEstimate: string
  shippingEstimateDate: string | null
  lockTTL: string | null
  availableDeliveryWindows: any[]
  deliveryWindow: string | null
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: {
    isPickupStore: boolean
    friendlyName: string | null
    address: CheckoutAddress | null
    additionalInfo: any | null
    dockId: string | null
  }
  pickupPointId: string | null
  pickupDistance: number
  polygonName: string | null
}

export interface SLA {
  id: string
  deliveryChannel: string
  name: string
  deliveryIds: Array<{
    courierId: string
    warehouseId: string
    dockId: string
    courierName: string
    quantity: number
  }>
  shippingEstimate: string
  shippingEstimateDate: string | null
  lockTTL: string | null
  availableDeliveryWindows: any[]
  deliveryWindow: string | null
  price: number
  listPrice: number
  tax: number
  pickupStoreInfo: {
    isPickupStore: boolean
    friendlyName: string | null
    address: CheckoutAddress | null
    additionalInfo: any | null
    dockId: string | null
  }
  pickupPointId: string | null
  pickupDistance: number
  polygonName: string | null
}

export interface ItemWithSimulationInput {
  itemId: string
  sellers: Array<{
    sellerId: string
  }>
}

export interface OrderFormPayment {
  paymentSystem: number
  referenceValue: number
  bin: number
  tokenId: string
}
