interface SelectedFacets {
  key: string
  value: string
}

interface QueryArgs {
  query: string
  map?: string
  selectedFacets?: SelectedFacets[]
}

export interface SearchArgs extends QueryArgs {
  category: string | null
  specificationFilters: string[] | null
  priceRange?: string | null
  collection: string | null
  salesChannel: string | null
  orderBy: string | null
  from: number | null
  to: number | null
  hideUnavailableItems: boolean | null
  simulationBehavior: 'skip' | 'default' | null
  completeSpecifications: boolean
}

export interface Brand {
  id: string
  name: string
  isActive: boolean
  title: string | null
  metaTagDescription: string | null
  imageUrl: string | null
}

export interface CategoryTreeResponse {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: CategoryTreeResponse[]
  Title: string
  MetaTagDescription: string
}

export interface CategoryByIdResponse {
  parentId: number | null
  GlobalCategoryId: number
  GlobalCategoryName: string
  position: number
  slug: string
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: null
  Title: string
  MetaTagDescription: string
}

export interface SearchProduct {
  productId: string
  productName: string
  brand: string
  brandId: number
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  clusterHighlights: Record<string, string>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: SearchItem[]
  itemMetadata: {
    items: SearchMetadataItem[]
  }
  titleTag: string
  Specifications?: string[]
  allSpecifications?: string[]
  allSpecificationsGroups?: string[]
  completeSpecifications?: CompleteSpecification[]
  skuSpecifications?: SkuSpecification[]
}

interface SearchItem {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: ReferenceID[]
  measurementUnit: string
  unitMultiplier: number
  modalType: any | null
  images: SearchImage[]
  Videos: string[]
  variations: string[]
  sellers: Seller[]
  attachments: Attachment[]
  isKit: boolean
  kitItems?: KitItem[]
}

interface KitItem {
  itemId: string
  amount: number
}

interface ReferenceID {
  Key: string
  Value: string
}

interface Attachment {
  id: number
  name: string
  required: boolean
  domainValues: string
}

interface CompleteSpecification {
  Values: CompleteSpecificationValue[]
  Name: string
  Position: number
  IsOnProductDetails: boolean
  FieldId: string
}

interface CompleteSpecificationValue {
  Id: string
  Position: number
  Value: string
}

interface SkuSpecification {
  field: SKUSpecificationField
  values: SKUSpecificationValue[]
}

interface SKUSpecificationField {
  name: string
  id: string
}

interface SKUSpecificationValue {
  name: string
  id: string
  fieldId: string
}

interface SearchImage {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
}

interface SearchInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<
    string,
    { DeliverySlaPerTypes: any[]; Region: any | null }
  >
  Installments: SearchInstallment[]
  DiscountHighLight: any[]
  GiftSkuIds: string[]
  Teasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  DeliverySlaSamples: DeliverySlaSample[]
  GetInfoErrorMessage: any | null
  CacheVersionUsedToCallCheckout: string
}

interface DeliverySlaSample {
  DeliverySlaPerTypes: any[]
  Region: any | null
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

export interface SearchFacet {
  Quantity: number
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}

interface SearchFacetCategory {
  Id: number
  Quantity: number
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: SearchFacetCategory[]
}

interface SummaryItem {
  DisplayedItems: number
  TotalItems: number
}

export interface SearchFacets {
  Departments: SearchFacet[]
  Brands: SearchFacet[]
  SpecificationFilters: Record<string, SearchFacet[]>
  CategoriesTrees: SearchFacetCategory[]
  PriceRanges: PriceRange[]
  Summary: {
    Departments: SummaryItem
    CategoriesTrees: SummaryItem
    Brands: SummaryItem
    PriceRanges: SummaryItem
    SpecificationFilters: Record<string, SummaryItem>
  }
}

interface PriceRange {
  Slug: string
  Quantity: number
  Name: string
  Link: string
  LinkEncoded: string
  Map: null
  Value: string
}

interface SearchAutocompleteItem {
  productId: string
  itemId: string
  name: string
  nameComplete: string
  imageUrl: string
}

export interface SearchAutocompleteUnit {
  items: SearchAutocompleteItem[]
  thumb: string
  thumbUrl: string | null
  name: string
  href: string
  criteria: string
}

export interface FieldTreeResponseAPI {
  Name: string
  CategoryId: number
  FieldId: number
  IsActive: boolean
  IsStockKeepingUnit: boolean
}

export interface FieldResponseAPI {
  Name: string
  CategoryId: number | null
  FieldId: number
  IsActive: boolean
  IsRequired: boolean
  FieldTypeId: number
  FieldTypeName: string
  FieldValueId: string | null
  Description: string | null
  IsStockKeepingUnit: boolean
  IsFilter: boolean
  IsOnProductDetails: boolean
  Position: number
  IsWizard: boolean
  IsTopMenuLinkActive: boolean
  IsSideMenuLinkActive: boolean
  DefaultValue: string | null
  FieldGroupId: number
  FieldGroupName: string
}

interface CompositionItem {
  id: string
  minQuantity: number
  maxQuantity: number
  initialQuantity: number
  priceTable: string
  seller: string
}

interface Composition {
  minQuantity: number
  maxQuantity: number
  items: CompositionItem[]
}

interface AssemblyOption {
  id: string
  name: string
  composition: Composition | null
  inputValues: InputValues
}

interface InputValues {
  [key: string]: RawInputValue
}

interface RawInputValue {
  maximumNumberOfCharacters: number
  domain: string[]
}

interface SearchMetadataItem {
  Name: string
  NameComplete: string
  MainImage: string
  BrandName: string
  CategoryId: number
  ProductId: number
  id: string
  seller: string
  assemblyOptions: AssemblyOption[]
}
export interface FilterListTreeCategoryById {
  Name: string
  CategoryId: number
  FieldId: number
  isActive: boolean
  IsStockKeepingUnit: boolean
}
