import { OutgoingHttpHeaders } from 'http'

import {
  InstanceOptions,
  IOContext,
  IOResponse,
  JanusClient,
  MasterData,
  parseAppId,
} from '@vtex/api'

export interface DocumentResponse {
  Id: string
  Href: string
  DocumentId: string
}

export interface Attachment {
  data: Buffer
  headers: OutgoingHttpHeaders
}

export interface CLData {
  email: string
  homePhone: string
}

export interface PaginationArgs {
  page: number
  pageSize: number
}

export type QueriableFields<K extends string> = '_all' | K[]

export interface EntityMetadata {
  followers: string[]
  schemas: string[]
  createdIn: Date
  createdBy: string
  createdBy_USER: {
    Id: string
    Login: string
    Name: string | undefined | null
  }
  lastInteractionIn: Date
  lastInteractionBy: string
  lastInteractionBy_USER: EntityMetadata['createdBy_USER']
  tags: string[]
  dataInstanceId: string
}

type WithMetadata<TEntity extends Record<string, any>> = TEntity &
  EntityMetadata
abstract class MasterDataEntity<
  TEntity extends Record<string, any>
> extends JanusClient {
  abstract get<K extends keyof WithMetadata<TEntity>>(
    id: string,
    fields: Array<ThisType<K>> | ['_all']
  ): Promise<Pick<WithMetadata<TEntity>, K>>

  abstract save(entity: TEntity): Promise<DocumentResponse>
  abstract update(id: string, partialEntity: Partial<TEntity>): Promise<void>
  abstract saveOrUpdate(
    entity: TEntity & { id: string | undefined }
  ): Promise<DocumentResponse>

  abstract delete(id: string): Promise<IOResponse<void>>
  abstract search<K extends keyof WithMetadata<TEntity>>(
    pagination: PaginationArgs,
    fields: Array<ThisType<K>> | ['_all'],
    where?: string
  ): Promise<Array<Pick<WithMetadata<TEntity>, K>>>
}

const GLOBAL = ''
/**
 * This is necessary since masterdata does not accept special characters on entity name
 * This function replaces `.` and `-` for `_`
 * @param str dataEntityName
 */
const normalizeEntityName = (str: string) => str.replace(/(\.)|-|:/gi, '_')

const versionDescriptor = (isProduction: boolean, workspace: string) =>
  isProduction ? GLOBAL : `-${workspace}`

export const masterDataFor = <TEntity extends Record<string, any>>(
  entityName: string,
  providerAppId?: Maybe<string>
): new (context: IOContext, options?: InstanceOptions) => MasterDataEntity<
  TEntity
> => {
  return class extends MasterDataEntity<TEntity> {
    private dataEntity: string
    private schema: string
    private md: MasterData
    constructor(ctx: IOContext, options?: InstanceOptions) {
      super(ctx, options)
      const app = parseAppId(providerAppId ?? process.env.VTEX_APP_ID)

      this.md = new MasterData(ctx, options)
      this.schema = `${app.version}${versionDescriptor(
        ctx.production,
        ctx.workspace
      )}`
      this.dataEntity = normalizeEntityName(`${app.name}_${entityName}`)
    }

    public save(entity: TEntity) {
      return this.md.createDocument({
        dataEntity: this.dataEntity,
        fields: entity,
        schema: this.schema,
      })
    }

    public update(id: string, fields: Partial<TEntity>) {
      return this.md.updatePartialDocument({
        dataEntity: this.dataEntity,
        id,
        fields,
        schema: this.schema,
      })
    }

    public saveOrUpdate(fields: TEntity & { id: string }) {
      return this.md.createOrUpdateEntireDocument({
        dataEntity: this.dataEntity,
        fields,
        schema: this.schema,
      })
    }

    public delete(id: string) {
      return this.md.deleteDocument({ dataEntity: this.dataEntity, id })
    }

    public search<K extends keyof WithMetadata<TEntity>>(
      pagination: PaginationArgs,
      fields: Array<ThisType<K> | '_all'>,
      where?: string
    ): Promise<Array<Pick<WithMetadata<TEntity>, K>>> {
      return this.md.searchDocuments<Pick<WithMetadata<TEntity>, K>>({
        dataEntity: this.dataEntity,
        pagination,
        fields: fields.map((field) => field.toString()),
        where,
        schema: this.schema,
      })
    }

    public get<K extends keyof WithMetadata<TEntity>>(
      id: string,
      fields: Array<ThisType<K> | '_all'>
    ) {
      return this.md.getDocument<Pick<WithMetadata<TEntity>, K>>({
        dataEntity: this.dataEntity,
        id,
        fields: fields.map((field) => field.toString()),
      })
    }
  }
}
