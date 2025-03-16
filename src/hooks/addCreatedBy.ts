import { CollectionBeforeChangeHook } from 'payload'

export const addCreatedBy: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (req.user && operation === 'create') {
    data.createdBy = req.user.id
  }

  return data
}
