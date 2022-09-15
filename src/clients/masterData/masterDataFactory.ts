import type { InstanceOptions, IOContext } from '@vtex/api'

import type { MasterDataEntity } from './MasterDataEntity'
import {
  buildSchemaService,
  CreateEntityConfigurationService,
} from './services'
import { MasterDataEntityV1 } from './MasterDataEntity/MasterDataEntityV1'

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
