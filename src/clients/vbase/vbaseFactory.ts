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

abstract class VBaseEntityRepository<
  K extends string,
  V extends object
> extends VBase {
  abstract save(k: K, entity: V, ifMatch?: string): Promise<void>
  abstract trySaveIfHashMatches(k: K, hash: string, entity: V): Promise<void>
  abstract get(k: K, nullIfNotfound?: boolean): Promise<V>
  abstract get(k: K, nullIfNotfound: true): Promise<V | null>
  abstract getRaw(k: K, nullIfNotfound?: boolean): Promise<IOResponse<V>>
  abstract getWithMetadata(
    k: K,
    nullIfNotFound?: boolean
  ): Promise<EntityWithMetadata<V>>
}

export const vbaseFor = <K extends string, V extends object>(
  bucket: string
): new (context: IOContext, options?: InstanceOptions) => VBaseEntityRepository<
  K,
  V
> => {
  return class extends VBaseEntityRepository<K, V> {
    public save(k: K, entity: V, ifMatch?: string | undefined) {
      return this.saveJSON(bucket, k, entity, undefined, ifMatch)
    }

    public get(k: K, nullIfNotfound = false) {
      return this.getJSON<V>(bucket, k, nullIfNotfound)
    }

    public getRaw(k: K, nullIfNotfound = false) {
      return this.getRawJSON<V>(bucket, k, nullIfNotfound)
    }

    public getWithMetadata(k: K, nullIfNotfound = false) {
      return this.getRaw(k, nullIfNotfound).then((res) => {
        const { etag } = res.headers
        const isNotFound = res.status === 404
        const metadata: EntityMetadata = { hash: etag }

        if (isNotFound && nullIfNotfound) {
          return { entity: null, metadata }
        }

        return { entity: res.data, metadata }
      })
    }

    public trySaveIfHashMatches(k: K, hash: string, entity: V): Promise<void> {
      return this.saveJSON(bucket, k, entity, undefined, hash)
    }
  }
}
