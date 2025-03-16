import { CollectionBeforeChangeHook } from 'payload'

export const updateModifiedBy: CollectionBeforeChangeHook = ({ data, req }) => {
  if (req.user) {
    data.modifiedBy = req.user.id
  }

  return data
}
