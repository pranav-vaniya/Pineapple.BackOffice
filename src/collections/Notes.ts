import { createdBy } from '@/fields/createdBy'
import { modifiedBy } from '@/fields/modifiedBy'
import { SuperAdminOrClientAdminOrCreatedBy } from '@/helpers/accessControl'
import { CollectionSlugs } from '@/helpers/utils'
import { addCreatedBy } from '@/hooks/addCreatedBy'
import { updateModifiedBy } from '@/hooks/updateModifiedBy'
import { CollectionConfig } from 'payload'

export const Notes: CollectionConfig = {
  slug: CollectionSlugs.Notes,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'note'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
      required: true,
    },
    createdBy,
    modifiedBy,
  ],
  access: {
    create: () => true,
    read: SuperAdminOrClientAdminOrCreatedBy,
    update: SuperAdminOrClientAdminOrCreatedBy,
    delete: SuperAdminOrClientAdminOrCreatedBy,
  },
  hooks: {
    beforeChange: [addCreatedBy, updateModifiedBy],
  },
}
