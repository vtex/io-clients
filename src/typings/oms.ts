export interface OrderChanged {
  type: string
  invoiceNumber: string
  invoiceUrl: string
  courier: string
  trackingNumber: string
  trackingUrl: string
  embeddedInvoice: string
  orderId: string
  items: any
  issuanceDate: Date
  invoiceValue: number
  isLast: boolean
  invoiceKey: string
  courierStatus: any
  cfop: any
}

export interface OrderModifyTracking {
  id: string
  tracking_provider: string
  tracking_number?: string
  origin_country_code: string
  ship_note?: string
}

export interface OrderRefund {
  id: string
  reason_code: number
  reason_note?: string
}

export interface OrderItemChanged {
  id: string
  quantity: number
  price: number
}

export interface ApprovedOrder {
  date: string
  marketplaceOrderId: string
  orderId: string
  receipt: string
}

export interface OrderDetail {
  items: OrderItemDetail[]
  isCreatedAsync?: boolean
  marketplaceOrderId: string
  marketplacePaymentValue: number
  marketplaceServicesEndpoint: string
  clientProfileData: ClientProfileDetail
  shippingData: ShippingDetail
}

export interface ClientProfileDetail {
  corporateDocument?: string
  corporateName?: string
  corporatePhone?: string
  document: string
  documentType?: string
  email: string
  firstName: string
  lastName: string
  phone: string
  stateInscription?: string
  tradeName?: string
  userProfileId?: any
  isCorporate?: boolean
}

export interface OrderItemDetail {
  id: number
  price: number
  quantity: number
  seller: number
  commission?: number
  freightCommission?: number
  bundleItems?: any
  itemAttachment?: ItemAttachment
  attachments?: any
  priceTags?: any
  measurementUnit?: any
  unitMultiplier?: number
  isGift?: boolean
}

export interface ItemAttachment {
  name: string
  content: any
}

export interface ShippingDetail {
  address: AddressDetail
  logisticsInfo: LogisticsInfo[]
}

export interface AddressDetail {
  addressId?: string
  addressType?: string
  receiverName: string
  complement?: string
  city: string
  state: string
  country: string
  neighborhood?: string
  postalCode: string
  reference?: string
  street: string
  number?: string
}

export interface LogisticsInfo {
  shippingEstimate: string
  itemIndex: number
  lockTTL: string
  price: number
  selectedSla: string
  deliveryWindow?: any
  listPrice?: number
  sellingPrice?: number
  deliveryCompany?: string
  shippingEstimateDate?: string
  slas?: any
  shipsTo?: any
  deliveryIds?: any[]
  deliveryChannel?: string
  pickupStoreInfo?: any
  addressId?: string
  polygonName?: any
}

export interface OrderDetailResponse {
  orderId: string
  sequence: number
  marketplaceOrderId: string
  marketplaceServicesEndpoint: string
  sellerOrderId: string
  origin: string
  affiliateId: string
  salesChannel: string
  merchantName: string
  status: string
  statusDescription: string
  value: number
  creationDate: string
  lastChange: string
  orderGroup: any
  totals: ItemTotal[]
  items: OrderItemDetailResponse[]
  marketplaceItems: any[]
  clientProfileData: ClientProfileDetail
  giftRegistryData: any
  marketingData: any
  ratesAndBenefitsData: any
  shippingData: ShippingDetail
  paymentData: PaymentData
  packageAttachment: PackageAttachment
  sellers: SellerDetail[]
  callCenterOperatorData: any
  followUpEmail: string
  lastMessage: any
  hostname: string
  invoiceData: any
  changesAttachment: any
  openTextField: any
  roundingError: number
  orderFormId: any
  commercialConditionData: any
  isCompleted: boolean
  customData: CustomData
  storePreferencesData: StorePreferencesData
  allowCancellation: boolean
  allowEdition: boolean
  isCheckedIn: boolean
  marketplace: Marketplace
  authorizedDate: string
  invoicedDate: string
}

export interface CustomData {
  customApps: CustomApps[]
}

export interface CustomApps {
  fields: any
  id: string
  major: number
}

export interface ItemTotal {
  id: string
  name: string
  value: number
}
export interface PriceTag {
  name: string
  value: number
  isPercentual: boolean
  identifier: any
  rawValue: number
}

export interface AdditionalInfo {
  brandName: string
  brandId: string
  categoriesIds: string
  productClusterId: string
  commercialConditionId: string
  dimension: Dimension
  offeringInfo: any
  offeringType: any
  offeringTypeId: any
}

export interface Dimension {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

export interface OrderItemDetailResponse {
  uniqueId: string
  id: string
  productId: string
  ean: string
  lockId: string
  itemAttachment: any[]
  attachments: any[]
  quantity: number
  seller: string
  name: string
  refId: string
  price: number
  listPrice: number
  manualPrice: any
  priceTags: PriceTag[]
  imageUrl: string
  detailUrl: null
  components: any[]
  bundleItems: any[]
  params: any[]
  offerings: any[]
  sellerSku: string
  priceValidUntil: any
  commission: number
  tax: number
  preSaleDate: any
  additionalInfo: AdditionalInfo
  measurementUnit: string
  unitMultiplier: number
  sellingPrice: number
  isGift: boolean
  shippingPrice: any
  rewardValue: number
  freightCommission: number
  priceDefinition: any
  taxCode: string
  productCategories: any
}

export interface PaymentDetail {
  id: any
  paymentSystem: string
  paymentSystemName: string
  value: number
  installments: number
  referenceValue: number
  cardHolder: any
  cardNumber: any
  firstDigits: any
  lastDigits: any
  cvv2: any
  expireMonth: any
  expireYear: any
  url: any
  giftCardId: any
  giftCardName: any
  giftCardCaption: any
  redemptionCode: any
  group: any
  tid: any
  dueDate: any
  connectorResponses: any
}

export interface TransactionDetail {
  isActive: boolean
  transactionId: any
  merchantName: any
  payments: PaymentDetail[]
}

export interface PaymentData {
  transactions: TransactionDetail[]
}

export interface Marketplace {
  baseURL: string
  isCertified: boolean
  name: string
}

export interface StorePreferencesData {
  countryCode: string
  currencyCode: string
  currencyFormatInfo: CurrencyFormatInfo
  currencyLocale: number
  currencySymbol: string
  timeZone: string
}

export interface CurrencyFormatInfo {
  CurrencyDecimalDigits: number
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
  CurrencyGroupSize: number
  StartsWithCurrencySymbol: boolean
}

export interface SellerDetail {
  id: string
  name: string
  logo: string
}

export interface CourierStatus {
  status: string
  finished: boolean
  data: any
}

export interface PackageAttachment {
  packages: PackageDetail[]
}

export interface PackageDetail {
  items: ItemPackage[]
  courier: string
  invoiceNumber: string
  invoiceValue: number
  invoiceUrl: string
  issuanceDate: string
  trackingNumber: string
  invoiceKey: any
  trackingUrl: string
  embeddedInvoice: string
  type: string
  courierStatus: CourierStatus
  cfop: any
}

export interface ItemPackage {
  itemIndex: number
  quantity: number
  price: number
  description: string
  unitMultiplier: number
}

export interface NotificationResponse {
  date: string
  orderId: string
  receipt: string
}

export interface NotificationInput {
  type: string
  issuanceDate: string
  invoiceNumber: string
  invoiceKey?: string
  invoiceValue: number
  invoiceUrl: string
  courier: string
  trackingNumber: string
  trackingUrl: string
  dispatchDate?: string | null
  items: Item[]
}

export interface Item {
  id: string
  quantity: number
  price: number
}

export interface CancelResponse {
  date: string
  orderId: string
  receipt: string
}

export interface ListOrdersResponse {
  list: ListOrdersItem[]
}

export interface ListOrdersItem {
  orderId: string
  creationDate: string
  clientName: string
  items: Item[]
  totalValue: number
  paymentNames: string
  status: string
  statusDescription: string
  marketPlaceOrderId: string | null
  sequence: string
  salesChannel: string
  affiliateId: string
  origin: string
  workflowInErrorState: boolean
  workflowInRetry: boolean
  lastMessageUnread: string
  ShippingEstimatedDate: string | null
  ShippingEstimatedDateMax: string | null
  ShippingEstimatedDateMin: string | null
  orderIsComplete: boolean
  listId: string | null
  listType: any
  authorizedDate: string
  callCenterOperatorName: string | null
  totalItems: number
  currencyCode: string
}
