import {
  AppClient,
  InstanceOptions,
  IOContext,
  RequestConfig,
  SegmentData,
  CacheType,
} from '@vtex/api'
import { stringify } from 'qs'

import {
  Brand,
  CategoryByIdResponse,
  CategoryTreeResponse,
  FieldResponseAPI,
  FilterListTreeCategoryById,
  SearchArgs,
  SearchAutocompleteUnit,
  SearchFacets,
  SearchProduct,
} from '../typings/search'
import { searchEncodeURI, SearchCrossSellingTypes } from '../utils/search'

interface AutocompleteArgs {
  maxRows: number | string
  searchTerm: string
}

interface CustomIOContext extends IOContext {
  segment?: SegmentData
}

// eslint-disable-next-line no-restricted-syntax
enum SimulationBehavior {
  SKIP = 'skip',
  DEFAULT = 'default',
}

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return `${baseURL!}${url!}${stringify(params, {
    arrayFormat: 'repeat',
    addQueryPrefix: true,
  })}&segmentToken=${headers['x-vtex-segment']}`
}

interface SearchPageTypeResponse {
  id: string
  pageType: string
  name: string
  url: string
  title: string | null
  metaTagDescription: string | null
}

/** Search API
 * Docs: https://documenter.getpostman.com/view/845/catalogsystem-102/Hs44
 */
export class Search extends AppClient {
  private searchEncodeURI: (x: string) => string
  private basePath: string

  private addSalesChannel = (url: string, salesChannel?: string | number) => {
    if (!salesChannel) {
      return url
    }

    return url.concat(`&sc=${salesChannel}`)
  }

  private addCompleteSpecifications = (url: string) => {
    if (!url.includes('?')) {
      return `${url}?compSpecs=true`
    }

    return `${url}&compSpecs=true`
  }

  constructor(ctx: IOContext, opts?: InstanceOptions) {
    super('vtex.catalog-api-proxy@0.x', ctx, opts)

    this.basePath = ctx.sessionToken
      ? '/proxy/authenticated/catalog'
      : '/proxy/catalog'
    this.searchEncodeURI = searchEncodeURI(ctx.account)
  }

  public pageType = (path: string, query = '') => {
    const pageTypePath = path.startsWith('/') ? path.substr(1) : path

    const pageTypeQuery = !query || query.startsWith('?') ? query : `?${query}`

    return this.get<SearchPageTypeResponse>(
      `/pub/portal/pagetype/${pageTypePath}${pageTypeQuery}`,
      { metric: 'search-pagetype' }
    )
  }

  public product = (slug: string) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        `/pub/products/search/${this.searchEncodeURI(slug?.toLowerCase())}/p`
      ),
      { metric: 'search-product' }
    )

  public productByEan = (id: string) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        `/pub/products/search?fq=alternateIds_Ean:${id}`
      ),
      {
        metric: 'search-productByEan',
      }
    )

  public productsByEan = (ids: string[], salesChannel?: string | number) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        this.addSalesChannel(
          `/pub/products/search?${ids
            .map((id) => `fq=alternateIds_Ean:${id}`)
            .join('&')}`,
          salesChannel
        )
      ),
      { metric: 'search-productByEan' }
    )

  public productById = (id: string, cacheable = true) => {
    const isVtex = this.context.platform === 'vtex'
    const url = isVtex
      ? this.addCompleteSpecifications(
          `/pub/products/search?fq=productId:${id}`
        )
      : `/products/${id}`

    return this.get<SearchProduct[]>(url, {
      metric: 'search-productById',
      ...(cacheable ? {} : { cacheable: CacheType.None }),
    })
  }

  public productsById = (ids: string[], salesChannel?: string | number) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        this.addSalesChannel(
          `/pub/products/search?${ids
            .map((id) => `fq=productId:${id}`)
            .join('&')}`,
          salesChannel
        )
      ),
      { metric: 'search-productById' }
    )

  public productByReference = (id: string) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        `/pub/products/search?fq=alternateIds_RefId:${id}`
      ),
      {
        metric: 'search-productByReference',
      }
    )

  public productsByReference = (
    ids: string[],
    salesChannel?: string | number
  ) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        this.addSalesChannel(
          `/pub/products/search?${ids
            .map((id) => `fq=alternateIds_RefId:${id}`)
            .join('&')}`,
          salesChannel
        )
      ),
      { metric: 'search-productByReference' }
    )

  public productBySku = (skuId: string) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(`/pub/products/search?fq=skuId:${skuId}`),
      {
        metric: 'search-productBySku',
      }
    )

  public productsBySku = (skuIds: string[], salesChannel?: string | number) =>
    this.get<SearchProduct[]>(
      this.addCompleteSpecifications(
        this.addSalesChannel(
          `/pub/products/search?${skuIds
            .map((skuId) => `fq=skuId:${skuId}`)
            .join('&')}`,
          salesChannel
        )
      ),
      { metric: 'search-productsBySku' }
    )

  public productsRaw = (args: SearchArgs) => {
    return this.getRaw<SearchProduct[]>(this.productSearchUrl(args), {
      metric: 'search-products',
    })
  }

  public products = (args: SearchArgs) => {
    return this.get<SearchProduct[]>(this.productSearchUrl(args), {
      metric: 'search-products',
    })
  }

  public productsQuantity = async (args: SearchArgs) => {
    const {
      headers: { resources },
    } = await this.getRaw(this.productSearchUrl(args))

    const [, quantity] = resources.split('/')

    return parseInt(quantity, 10)
  }

  public brands = () =>
    this.get<Brand[]>('/pub/brand/list', { metric: 'search-brands' })

  public brand = (id: number) =>
    this.get<Brand[]>(`/pub/brand/${id}`, { metric: 'search-brands' })

  public categories = (treeLevel: number) =>
    this.get<CategoryTreeResponse[]>(`/pub/category/tree/${treeLevel}/`, {
      metric: 'search-categories',
    })

  public getCategoryChildren = (id: number) =>
    this.get<Record<string, string>>(
      `/pub/category/categories/children?id=${id}`,
      {
        metric: 'search-category-children',
      }
    )

  public facets = (facets = '') => {
    const [path, options] = decodeURI(facets).split('?')

    return this.get<SearchFacets>(
      `/pub/facets/search/${encodeURI(
        this.searchEncodeURI(`${path.trim()}${options ? `?${options}` : ''}`)
      )}`,
      { metric: 'search-facets' }
    )
  }

  public category = (id: string | number) =>
    this.get<CategoryByIdResponse>(`/pub/category/${id}`, {
      metric: 'search-category',
    })

  public crossSelling = (id: string, type: SearchCrossSellingTypes) =>
    this.get<SearchProduct[]>(
      `/pub/products/crossselling/${type}/${id}?groupByProduct=true`,
      {
        metric: 'search-crossSelling',
      }
    )

  public filtersInCategoryFromId = (id: string | number) =>
    this.get<FilterListTreeCategoryById[]>(
      `/pub/specification/field/listTreeByCategoryId/${id}`,
      {
        metric: 'search-listTreeByCategoryId',
      }
    )

  public autocomplete = ({ maxRows, searchTerm }: AutocompleteArgs) =>
    this.get<{ itemsReturned: SearchAutocompleteUnit[] }>(
      `/buscaautocomplete?maxRows=${maxRows}&productNameContains=${encodeURIComponent(
        this.searchEncodeURI(searchTerm)
      )}`,
      { metric: 'search-autocomplete' }
    )

  private get = <T = any>(url: string, config: RequestConfig = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const segmentData: SegmentData | undefined = (
      this.context! as CustomIOContext
    ).segment

    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }
    config.inflightKey = inflightKey

    return this.http.get<T>(`${this.basePath}${url}`, config)
  }

  public getField = (id: number) =>
    this.get<FieldResponseAPI>(`/pub/specification/fieldGet/${id}`, {
      metric: 'catalog-get-field-by-id',
    })

  private getRaw = <T = any>(url: string, config: RequestConfig = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const segmentData: SegmentData | undefined = (
      this.context! as CustomIOContext
    ).segment

    const { channel: salesChannel = '' } = segmentData ?? {}

    config.params = {
      ...config.params,
      ...(!!salesChannel && { sc: salesChannel }),
    }
    config.inflightKey = inflightKey

    return this.http.getRaw<T>(`${this.basePath}${url}`, config)
  }

  private productSearchUrl = ({
    query = '',
    category = '',
    specificationFilters,
    priceRange = '',
    collection = '',
    salesChannel = '',
    orderBy = '',
    from = 0,
    to = 9,
    map = '',
    hideUnavailableItems = false,
    simulationBehavior = SimulationBehavior.DEFAULT,
    completeSpecifications = true,
  }: SearchArgs) => {
    const sanitizedQuery = encodeURIComponent(
      this.searchEncodeURI(decodeURIComponent(query || '').trim())
    )

    if (hideUnavailableItems) {
      const segmentData = (this.context as CustomIOContext).segment

      salesChannel = segmentData?.channel.toString() ?? ''
    }

    let url = `/pub/products/search/${sanitizedQuery}?`

    if (category && !query) {
      url += `&fq=C:/${category}/`
    }

    if (specificationFilters && specificationFilters.length > 0) {
      url += specificationFilters.map(
        (filter: string) => `&fq=${filter}`
      ) as unknown as string
    }

    if (priceRange) {
      url += `&fq=P:[${priceRange}]`
    }

    if (collection) {
      url += `&fq=productClusterIds:${collection}`
    }

    if (salesChannel) {
      url += `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
    }

    if (orderBy) {
      url += `&O=${orderBy}`
    }

    if (map) {
      url += `&map=${map}`
    }

    if (from != null && from > -1) {
      url += `&_from=${from}`
    }

    if (to != null && to > -1) {
      url += `&_to=${to}`
    }

    if (simulationBehavior === SimulationBehavior.SKIP) {
      url += `&simulation=false`
    }

    if (completeSpecifications) {
      url = this.addCompleteSpecifications(url)
    }

    return url
  }
}
