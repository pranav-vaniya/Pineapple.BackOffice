import { CollectionBeforeChangeHook } from 'payload'

export const addAssignedTo: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  if (req.user && operation === 'create') {
    data.assignedTo = req.user.id
  }

  return data
}
