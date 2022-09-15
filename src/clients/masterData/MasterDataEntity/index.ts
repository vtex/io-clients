import type { IOResponse } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export interface DocumentResponse {
  Id: string
  Href: string
  DocumentId: string
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

export type WithMetadata<TEntity extends Record<string, any>> = TEntity &
  EntityMetadata

export type ScrollInput<K> = {
  fields: Array<ThisType<K> | '_all'>
  sort?: string
  where?: string
  size?: number
  mdToken?: string
}

export abstract class MasterDataEntity<
  TEntity extends Record<string, any>
> extends JanusClient {
  abstract schema: string
  abstract dataEntity: string
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
    sort?: string,
    where?: string
  ): Promise<Array<Pick<WithMetadata<TEntity>, K>>>

  abstract searchRaw<K extends keyof WithMetadata<TEntity>>(
    pagination: PaginationArgs,
    fields: Array<ThisType<K>> | ['_all'],
    sort?: string,
    where?: string
  ): Promise<{
    data: Array<Pick<WithMetadata<TEntity>, K>>
    pagination: { total: number; page: number; pageSize: number }
  }>

  abstract scroll<K extends keyof WithMetadata<TEntity>>(
    input: ScrollInput<K>
  ): Promise<{
    data: Array<Pick<WithMetadata<TEntity>, K>>
    mdToken: string
  }>
}
