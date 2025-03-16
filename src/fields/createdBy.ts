import { Field } from 'payload'

export const createdBy: Field = {
  name: 'createdBy',
  label: 'Created By',
  type: 'relationship',
  relationTo: 'users',
  required: true,
  admin: {
    readOnly: true,
    condition: (data) => Boolean(data?.id),
  },
}
