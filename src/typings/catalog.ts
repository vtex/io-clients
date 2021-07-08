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

export interface GetSkuContextResponse {
  Id: number
  ProductId: number
  NameComplete: string
  ComplementName: string
  ProductName: string
  ProductDescription: string
  ProductRefId: string
  TaxCode?: string
  SkuName: string
  IsActive: boolean
  IsTransported: boolean
  IsInventoried: boolean
  IsGiftCardRecharge: boolean
  ImageUrl?: string
  DetailUrl: string
  CSCIdentification: string
  BrandId: string
  BrandName: string
  IsBrandActive: boolean
  Dimension: SkuDimension
  RealDimension: SkuRealDimension
  ManufacturerCode?: string
  IsKit: boolean
  KitItems: string[]
  Services: string[]
  Categories: string[]
  Attachments: SkuAttachment[]
  Collections: string[]
  SkuSellers: SkuSeller[]
  SalesChannels: number[]
  Images: SkuImage[]
  SkuSpecifications: SkuSpecification[]
  ProductSpecifications: SkuProductSpecification[]
  ProductClustersIds: string
  ProductCategoryIds: string
  IsDirectCategoryActive: boolean
  ProductGlobalCategoryId: number
  ProductCategories: SkuProductCategories
  CommercialConditionId: number
  RewardValue: number
  AlternateIds: SkuAlternateId[]
  AlternateIdValues: string[]
  EstimatedDateArrival: string
  MeasurementUnit: string
  UnitMultiplier: number
  InformationSource: string
  ModalType: string
}
interface SkuDimension {
  cubicweight: number
  height: number
  length: number
  weight: number
  width: number
}

interface SkuRealDimension {
  realCubicweight: number
  realHeight: number
  realLength: number
  realWeight: number
  realWidth: number
}

interface SkuAttachmentFields {
  FieldName: string
  MaxCaracters: string
  DomainValues: string
}

interface SkuAttachment {
  Id: number
  Name: string
  Keys: string[]
  Fields: SkuAttachmentFields
  IsActive: boolean
  IsRequired: boolean
}

interface SkuSeller {
  SellerId: string
  StockKeepingUnitId: number
  SellerStockKeepingUnitId: string
  IsActive: boolean
  FreightCommissionPercentage: number
  ProductCommissionPercentage: number
}

interface SkuImage {
  ImageUrl: string
  ImageName: string
  FileId: number
}

interface SkuSpecification {
  FieldId: number
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
}

interface SkuProductSpecification {
  FieldId: number
  FieldName: string
  FieldValueIds: number[]
  FieldValues: string[]
}

interface SkuProductCategories {
  [key: string]: string
}

interface SkuAlternateId {
  Ean: string
  RefId: string
}

export interface Category {
  Id: string
  Name: string
  FatherCategoryId: string | null
  Title: string
  Description: string
  Keywords: string
  IsActive: boolean
  LoomadeeCapaignCode: string
  AdWordsRemarketingCode: string
  ShowInStoreFront: boolean
  ShowBrandFilter: boolean
  ActiveStoreFrontLink: boolean
  GlobalCategoryId: number
  StockKeepingUnitSelectionMode: string
  Score: number | null
  LinkId: string
  HasChildren: boolean
}

export interface GetBrandResponse {
  id: number
  name: string
  imageUrl: string
  isActive: boolean
  title: string
  metaTagDescription: string
}
