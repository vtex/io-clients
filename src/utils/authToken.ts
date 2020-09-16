import { IOContext } from '@vtex/api'

export const getAuthToken = (ctx: IOContext, method: AuthMethod) => {
  if (method === 'ADMIN_TOKEN') return ctx.adminUserAuthToken
  if (method === 'STORE_TOKEN') return ctx.storeUserAuthToken
  if (method === 'AUTH_TOKEN') return ctx.authToken
}
