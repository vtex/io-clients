import type {
  InstanceOptions,
  IOContext,
  MasterData,
  ParsedLocator,
} from '@vtex/api'

export type BuildSchemaServiceConstructorParams = {
  app: ParsedLocator
  context: IOContext
  masterdataClient: MasterData
  dataEntityName: string
  schemaBuilderVersion: number
  options?: InstanceOptions
}

export function buildSchemaService({
  app,
  context,
  masterdataClient,
  dataEntityName,
  schemaBuilderVersion,
}: BuildSchemaServiceConstructorParams) {
  const schemaBuilders = new SchemaBuilders({
    app,
    context,
    masterdataClient,
    dataEntityName,
  })

  const schemaBuilderInstance = `executeSchemaBuilderV${schemaBuilderVersion}`

  return (
    schemaBuilders.schemaBuilderExecutors[schemaBuilderInstance] ??
    schemaBuilders.schemaBuilderExecutors.executeSchemaBuilderDefault
  )
}

class SchemaBuilders {
  private app: ParsedLocator
  private context: IOContext
  private masterdataClient: MasterData
  private dataEntityName: string

  public schemaBuilderExecutors: {
    [key: string]: () => Promise<string> | string
  } = {
    executeSchemaBuilderDefault: this.schemaBuilderV1.bind(this),
    executeSchemaBuilderV1: this.schemaBuilderV1.bind(this),
    executeSchemaBuilderV2: this.schemaBuilderV2.bind(this),
  }

  constructor({
    app,
    context,
    masterdataClient,
    dataEntityName,
  }: Omit<BuildSchemaServiceConstructorParams, 'schemaBuilderVersion'>) {
    this.app = app
    this.context = context
    this.masterdataClient = masterdataClient
    this.dataEntityName = dataEntityName
  }

  /**
   * This is necessary since masterdata does not accept special characters on entity name
   * This function replaces `.` and `-` for `_`
   * @param str dataEntityName
   */
  private normalizeEntityName(str: string) {
    return str.replace(/(\.)|-|:|@/gi, '_')
  }

  private versionDescriptor = (isProduction: boolean, workspace: string) =>
    isProduction ? '' : `-${workspace}`

  private schemaBuilderV1() {
    const { production, workspace } = this.context

    return `${this.app.version}${this.versionDescriptor(production, workspace)}`
  }

  private async schemaBuilderV2(): Promise<string> {
    const { workspace, logger } = this.context
    const documentId = this.normalizeEntityName(
      `${this.app.locator}:${workspace}:${this.dataEntityName}`
    )

    try {
      const { associatedSchema } = await this.masterdataClient.getDocument<{
        id: string
        associatedSchema: { name: string }
      }>({
        dataEntity: 'vtex_builder_hub_appId_to_schema',
        fields: ['_all'],
        id: documentId,
      })

      return associatedSchema?.name
    } catch (error) {
      logger.error({
        client: 'masterdataFor',
        entity: this.dataEntityName,
        workspace,
        error:
          'No associated schema was found for current app version and workspace',
      })

      throw new Error(
        'No associated schema was found for current app version and workspace'
      )
    }
  }
}
