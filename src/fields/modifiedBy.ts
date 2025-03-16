import { Field } from 'payload'

export const modifiedBy: Field = {
  name: 'modifiedBy',
  label: 'Last Modified By',
  type: 'relationship',
  relationTo: 'users',
  required: true,
  admin: {
    readOnly: true,
    condition: (data) => Boolean(data?.id),
  },
}
