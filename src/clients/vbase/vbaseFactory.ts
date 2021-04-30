/* eslint-disable @typescript-eslint/ban-types */
import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { VBase } from '@vtex/api'

interface EntityMetadata {
  hash: string
}

export interface EntityWithMetadata<V> {
  entity: V | null
  metadata: EntityMetadata
}

abstract class VBaseEntityRepository<V extends object> extends VBase {
  abstract save(key: string, entity: V, ifMatch?: string): Promise<void>
  abstract trySaveIfHashMatches(
    key: string,
    hash: string,
    entity: V
  ): Promise<void>

  abstract get(key: string, nullIfNotfound?: boolean): Promise<V>
  abstract get(key: string, nullIfNotfound: true): Promise<V | null>
  abstract getRaw(key: string, nullIfNotfound?: boolean): Promise<IOResponse<V>>
  abstract getWithMetadata(
    key: string,
    nullIfNotFound?: boolean
  ): Promise<EntityWithMetadata<V>>
}

export const vbaseFor = <K extends string, V extends object>(
  bucket: string
): new (
  context: IOContext,
  options?: InstanceOptions
) => VBaseEntityRepository<V> => {
  return class extends VBaseEntityRepository<V> {
    public save(key: string, entity: V, ifMatch?: string | undefined) {
      return this.saveJSON(bucket, key, entity, undefined, ifMatch)
    }

    public get(key: string, nullIfNotfound = false) {
      return this.getJSON<V>(bucket, key, nullIfNotfound)
    }

    public getRaw(key: string, nullIfNotfound = false) {
      return this.getRawJSON<V>(bucket, key, nullIfNotfound)
    }

    public getWithMetadata(key: string, nullIfNotfound = false) {
      return this.getRaw(key, nullIfNotfound).then((res) => {
        const { etag } = res.headers
        const isNotFound = res.status === 404
        const metadata: EntityMetadata = { hash: etag }

        if (isNotFound && nullIfNotfound) {
          return { entity: null, metadata }
        }

        return { entity: res.data, metadata }
      })
    }

    public trySaveIfHashMatches(
      key: string,
      hash: string,
      entity: V
    ): Promise<void> {
      return this.saveJSON(bucket, key, entity, undefined, hash)
    }
  }
}
