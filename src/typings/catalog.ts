import { InstallmentOption } from './checkout'

export interface Seller {
  SellerId: string
  Name: string
  Email: string
  Description?: string
  ExchangeReturnPolicy?: string
  DeliveryPolicy?: string
  UseHybridPaymentOptions: boolean
  UserName?: string
  Password?: string
  SecutityPrivacyPolicy?: string
  CNPJ?: string
  CSCIdentification: string
  ArchiveId?: string
  UrlLogo?: string
  ProductCommissionPercentage: number
  FreightCommissionPercentage: number
  FulfillmentEndpoint: string
  CatalogSystemEndpoint: string
  IsActive?: boolean
  FulfillmentSellerId?: string
  SellerType?: number
  IsBetterScope?: boolean
}

export interface SearchProductInfo {
  productId: string
  productName: string
  brand: string
  brandId: number
  brandImageUrl: string | null
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string | null
  metaTagDescription: string
  releaseDate: Date
  clusterHighlights: any
  productClusters: any
  searchableClusters: any
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: SkuInfo[]
}

export interface SkuInfo {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceID[]
  measurementUnit: string
  unitMultiplier: number
  modalType: null
  isKit: boolean
  images: SearchImage[]
  sellers: SearchInfoSeller[]
  Videos: any[]
  estimatedDateArrival: null
}

export interface SearchImage {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
  imageLastModified: Date
}

export interface ReferenceID {
  Key: string
  Value: string
}

export interface SearchInfoSeller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: any
  Installments: Installment[]
  DiscountHighLight: any[]
  GiftSkuIds: any[]
  Teasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: Date | null
  AvailableQuantity: number
  Tax: number
  SaleChannel: number
  DeliverySlaSamples?: DeliverySlaSample[]
  GetInfoErrorMessage: null | string
  CacheVersionUsedToCallCheckout: string
  PaymentOptions: PaymentOptions | null
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[]
  Region: null
}

export interface Installment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export interface PaymentOptions {
  installmentOptions: InstallmentOption[]
  paymentSystems: PaymentSystem[]
  payments: any[]
  giftCards: any[]
  giftCardMessages: any[]
  availableAccounts: any[]
  availableTokens: any[]
}

export interface InstallmentElement {
  count: number
  hasInterestRate: boolean
  interestRate: number
  value: number
  total: number
  sellerMerchantInstallments?: InstallmentElement[]
  id?: string
}

export interface PaymentSystem {
  id: number
  name: string
  groupName: string
  validator: any
  stringId: string
  template: string
  requiresDocument: boolean
  isCustom: boolean
  description: string
  requiresAuthentication: boolean
  dueDate: Date
  availablePayments: any
}

export interface Product {
  Id: number
  RefId: string
  Name: string
}

export interface ProductSpecification {
  Value: string[]
  Id: number
  Name: string
}

export interface SKU {
  Id: number
  Name: string
  RefId: string
}

export interface GetSkuResponse {
  id: number
  ProductId: number
  IsActive: boolean
  Name: string
  RefId: number
  PackagedHeight: number
  PackagedLength: number
  PackagedWidth: number
  PackagedWeightKg: number
  Height: number
  Length: number
  WeightKg: number
  Width: number
  CubicWeight: number
  IsKit: boolean
  CreationDate: string
  RewardValue: string
  EstimatedDateArrival: string
  ManufacturerCode: string
  CommercialConditionId: number
  MeasurementUnit: number
  UnitMultiplier: number
  ModalType: string
  KitItensSellApart: string
  Videos: string
}

export interface MetadataItem {
  id: string
  name: string
  imageUrl: string
  detailUrl: string
  seller: string
  assemblyOptions: AssemblyOption[]
  skuName: string
  productId: string
  refId: string
  ean: string | null
}

export interface CompositionItem {
  id: string
  minQuantity: number
  maxQuantity: number
  initialQuantity: number
  priceTable: string
  seller: string
}

export interface Composition {
  minQuantity: number
  maxQuantity: number
  items: CompositionItem[]
}

export interface AssemblyOption {
  id: string
  name: string
  composition: Composition | null
}
