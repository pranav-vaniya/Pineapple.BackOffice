import { CollectionSlugs } from '@/helpers/utils'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: CollectionSlugs.Media,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  access: {
    read: () => true,
  },
}
