import type {
  InstanceOptions,
  IOContext,
  MasterData,
  ParsedLocator,
} from '@vtex/api'
import { parseAppId } from '@vtex/api'

import type { buildSchemaService as IBuildSchemaService } from '.'
import type { BuildSchemaServiceConstructorParams } from './buildSchemaService'

interface EntityConfigurationConstructorParams {
  buildSchemaService: typeof IBuildSchemaService
  entityName: string
  providerAppId: Maybe<string>
  schemaBuilderVersion: number
}

interface EntityConfigurationInstanceParams {
  builderMajor: number
  buildSchemaService: typeof IBuildSchemaService
  entityName: string
  providerAppId: Maybe<string>
}

interface ConstructedCreateEntityConfigurationService {
  getSchema: (
    masterdataClient: typeof MasterData,
    context: IOContext,
    options?: InstanceOptions
  ) => Promise<string>
  getEntityDetails: () => {
    entityName: string
    app: ParsedLocator
  }
}

export class CreateEntityConfigurationService
  implements ConstructedCreateEntityConfigurationService
{
  private buildSchemaService: ({
    app,
    context,
    masterdataClient,
    dataEntityName,
    schemaBuilderVersion,
  }: BuildSchemaServiceConstructorParams) => () => string | Promise<string>

  private static instance?: CreateEntityConfigurationService
  private entityName: string
  private app: ParsedLocator
  private schemaBuilderVersion: number

  public static getInstance() {
    if (this.instance) {
      return this.instance
    }

    throw new Error(
      'No instance of CreateEntityConfigurationService was instantiated'
    )
  }

  public static setInstance({
    builderMajor,
    buildSchemaService,
    entityName,
    providerAppId,
  }: EntityConfigurationInstanceParams): void {
    this.instance = new CreateEntityConfigurationService({
      buildSchemaService,
      entityName,
      providerAppId,
      schemaBuilderVersion: builderMajor,
    })
  }

  /**
   * This is necessary since masterdata does not accept special characters on entity name
   * This function replaces `.` and `-` for `_`
   * @param str dataEntityName
   */
  private normalizeEntityName(str: string) {
    return str.replace(/(\.)|-|:|@/gi, '_')
  }

  private constructor({
    buildSchemaService,
    entityName,
    providerAppId,
    schemaBuilderVersion,
  }: EntityConfigurationConstructorParams) {
    this.buildSchemaService = buildSchemaService
    this.app = parseAppId(providerAppId ?? process.env.VTEX_APP_ID)
    this.entityName = entityName
    this.schemaBuilderVersion = schemaBuilderVersion
  }

  public async getSchema(
    MasterdataClient: typeof MasterData,
    context: IOContext,
    options?: InstanceOptions
  ): Promise<string> {
    const masterdataClient = new MasterdataClient(context, {
      ...options,
      headers: {
        ...options?.headers,
        'x-vtex-accept-not-found': 'true',
      },
    })

    const schemaBuilt = this.buildSchemaService({
      app: this.app,
      dataEntityName: this.entityName,
      masterdataClient,
      schemaBuilderVersion: this.schemaBuilderVersion,
      context,
      options,
    }).bind(this)

    return schemaBuilt()
  }

  public getEntityDetails() {
    return {
      entityName: this.normalizeEntityName(
        `${this.app.name}_${this.entityName}`
      ),
      app: this.app,
    }
  }
}
