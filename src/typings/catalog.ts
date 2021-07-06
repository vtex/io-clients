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
  Id: number
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

export interface GetBrandResponse {
  id: number
  name: string
  imageUrl: string
  isActive: boolean
  title: string
  metaTagDescription: string
}

export interface GetCategoryResponse {
  Id: number
  Name: string
  FatherCategoryId: number
  Title: string
  Description: string
  Keywords: string
  IsActive: boolean
  LomadeeCampignCode: string
  AdWordsRemarketingCode: string
  ShowInStoreFront: boolean
  ShowBrandFilter: boolean
  ActiveStoreFrontLink: boolean
  GlobalCategoryId: number
  StockKeepingUnitSelectionMode: string
  Score: number
  LinkId: string
  HasChildren: boolean
}
