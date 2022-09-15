import type { InstanceOptions, IOContext } from '@vtex/api'
import { MasterData } from '@vtex/api'

import type {
  DocumentResponse,
  WithMetadata,
  PaginationArgs,
  ScrollInput,
} from '.'
import { MasterDataEntity } from '.'
import { buildSchemaDecorator } from '../decorators'
import { CreateEntityConfigurationService } from '../services'

const GLOBAL = ''

const versionDescriptor = (isProduction: boolean, workspace: string) =>
  isProduction ? GLOBAL : `-${workspace}`

@buildSchemaDecorator
export class MasterDataEntityV1<
  TEntity extends Record<string, any>
> extends MasterDataEntity<TEntity> {
  public dataEntity: string
  public schema: string
  private inner: MasterData
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, options)

    const {
      app: { version: appVersion },
      entityName,
    } = CreateEntityConfigurationService.getInstance().getEntityDetails()

    this.dataEntity = entityName
    this.inner = new MasterData(ctx, options)
    this.schema = `${appVersion}${versionDescriptor(
      ctx.production,
      ctx.workspace
    )}`
  }

  public async save(entity: TEntity): Promise<DocumentResponse> {
    return this.inner.createDocument({
      dataEntity: this.dataEntity,
      fields: entity,
      schema: this.schema,
    })
  }

  public async update(id: string, fields: Partial<TEntity>) {
    return this.inner.updatePartialDocument({
      dataEntity: this.dataEntity,
      id,
      fields,
      schema: this.schema,
    })
  }

  public async saveOrUpdate(
    fields: TEntity & { id: string }
  ): Promise<DocumentResponse> {
    return this.inner.createOrUpdateEntireDocument({
      dataEntity: this.dataEntity,
      fields,
      schema: this.schema,
    })
  }

  public async saveOrUpdatePartial(
    fields: TEntity & { id: string }
  ): Promise<DocumentResponse> {
    return this.inner.createOrUpdatePartialDocument({
      dataEntity: this.dataEntity,
      fields,
      schema: this.schema,
    })
  }

  public async delete(id: string) {
    return this.inner.deleteDocument({ dataEntity: this.dataEntity, id })
  }

  // eslint-disable-next-line max-params
  public async search<K extends keyof WithMetadata<TEntity>>(
    pagination: PaginationArgs,
    fields: Array<ThisType<K> | '_all'>,
    sort?: string,
    where?: string
  ): Promise<Array<Pick<WithMetadata<TEntity>, K>>> {
    return this.inner.searchDocuments<Pick<WithMetadata<TEntity>, K>>({
      dataEntity: this.dataEntity,
      pagination,
      fields: fields.map((field) => field.toString()),
      sort,
      where,
      schema: this.schema,
    })
  }

  // eslint-disable-next-line max-params
  public async searchRaw<K extends keyof WithMetadata<TEntity>>(
    pagination: PaginationArgs,
    fields: Array<ThisType<K> | '_all'>,
    sort?: string,
    where?: string
  ): Promise<{
    data: Array<Pick<WithMetadata<TEntity>, K>>
    pagination: { total: number; page: number; pageSize: number }
  }> {
    return this.inner.searchDocumentsWithPaginationInfo({
      dataEntity: this.dataEntity,
      pagination,
      fields: fields.map((field) => field.toString()),
      sort,
      where,
      schema: this.schema,
    })
  }

  public async get<K extends keyof WithMetadata<TEntity>>(
    id: string,
    fields: Array<ThisType<K> | '_all'>
  ) {
    return this.inner.getDocument<Pick<WithMetadata<TEntity>, K>>({
      dataEntity: this.dataEntity,
      id,
      fields: fields.map((field) => field.toString()),
    })
  }

  public async scroll<K extends keyof WithMetadata<TEntity>>(
    input: ScrollInput<K>
  ) {
    const { mdToken, data } = await this.inner.scrollDocuments({
      ...input,
      dataEntity: this.dataEntity,
      fields: input.fields.map((field) => field.toString()),
      schema: this.schema,
    })

    /**
     * The scroll method on Master Data's client is mistyped (duplicating the object)
     */
    return {
      mdToken,
      data: data as unknown as Array<Pick<WithMetadata<TEntity>, K>>,
    }
  }
}
