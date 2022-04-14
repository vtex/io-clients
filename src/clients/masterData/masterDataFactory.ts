import type { OutgoingHttpHeaders } from 'http'

import type { InstanceOptions, IOContext } from '@vtex/api'

import type { MasterDataEntity } from './MasterDataEntity'
import {
  buildSchemaService,
  CreateEntityConfigurationService,
} from './services'
import { MasterDataEntityV1 } from './MasterDataEntity/MasterDataEntityV1'

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

export type WithMetadata<TEntity extends Record<string, any>> = TEntity &
  EntityMetadata

export const masterDataFor = <TEntity extends Record<string, any>>(
  entityName: string,
  providerAppId?: Maybe<string>,
  masterdataBuilderMajor = 1
): new (
    context: IOContext,
    options?: InstanceOptions
  ) => MasterDataEntity<TEntity> => {
  CreateEntityConfigurationService.setInstance({
    builderMajor: masterdataBuilderMajor,
    entityName,
    providerAppId,
    buildSchemaService,
  })

  return MasterDataEntityV1
}
