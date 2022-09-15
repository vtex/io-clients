import { InstanceOptions, IOContext } from '@vtex/api'
import { MasterDataEntity } from '../../../../clients/masterData/MasterDataEntity'
import { MasterDataEntityV1 } from '../../../../clients/masterData/MasterDataEntity/MasterDataEntityV1'
import { masterDataFor } from '../../../../clients/masterData/masterDataFactory'

import * as service from '../../../../clients/masterData/services/CreateEntityConfigurationService'

describe('masterDataFactory', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be able to instantiate a major 1 masterdata builder and setInstance', async () => {
    jest
      .spyOn(service.CreateEntityConfigurationService, 'setInstance')
      .mockImplementation(jest.fn())
    jest
      .spyOn(service.CreateEntityConfigurationService, 'getInstance')
      .mockImplementation(
        jest.fn().mockReturnValue({
          getEntityDetails: jest.fn().mockReturnValue({
            app: { version: '1.1.1' },
          }),
        })
      )

    const MasterdataInstance = masterDataFor(
      'nameOfEntity',
      'vtex.app-name@1.1.1',
      1
    )
    const masterdataInstance = new MasterdataInstance({} as any)

    expect(service.CreateEntityConfigurationService.setInstance).toBeCalled()
    expect(masterdataInstance instanceof MasterDataEntity).toBe(true)
  })
})
