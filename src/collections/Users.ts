import { createdBy } from '@/fields/createdBy'
import { modifiedBy } from '@/fields/modifiedBy'
import {
  SuperAdminOrClientAdmin,
  SuperAdminOrCreatedBy,
  SuperAdminOrCreatedByOrSelf,
} from '@/helpers/accessControl'
import { UserRoles } from '@/helpers/utils'
import { addCreatedBy } from '@/hooks/addCreatedBy'
import { updateModifiedBy } from '@/hooks/updateModifiedBy'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['firstName', 'lastName', 'role', 'reportsTo', 'createdBy'],
  },
  auth: {
    loginWithUsername: {
      requireEmail: false,
      allowEmailLogin: false,
    },
  },
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: false,
    },
    {
      name: 'role',
      label: 'User Role',
      type: 'select',
      options: Object.values(UserRoles).map((role) => ({
        label: role,
        value: role,
      })),
      required: true,
    },
    {
      name: 'reportsTo',
      label: 'Reports To',
      type: 'relationship',
      relationTo: 'users',
      required: false,
    },
    createdBy,
    modifiedBy,
  ],
  access: {
    create: SuperAdminOrClientAdmin,
    read: () => true,
    update: SuperAdminOrCreatedBy,
    delete: SuperAdminOrCreatedBy,
  },
  hooks: {
    beforeChange: [addCreatedBy, updateModifiedBy],
  },
}
