import { Access, Where } from 'payload'
import { UserRoles } from './utils'

export const SuperAdminOrClientAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === UserRoles.SuperAdmin || user.role === UserRoles.ClientAdmin
}

export const SuperAdminOrCreatedBy: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === UserRoles.SuperAdmin) return true
  return { createdBy: { equals: user.id } }
}

export const SuperAdminOrCreatedByOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === UserRoles.SuperAdmin) return true
  const conditions: Where = {
    or: [{ createdBy: { equals: user.id } }, { id: { equals: user.id } }],
  }
  return conditions
}

export const SuperAdminOrSalesRep: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === UserRoles.SuperAdmin || user.role === UserRoles.SalesRep
}

export const SuperAdminOrClientAdminOrCreatedBy: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === UserRoles.SuperAdmin || user.role === UserRoles.ClientAdmin) return true
  return { createdBy: { equals: user.id } }
}
