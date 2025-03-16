import { createdBy } from '@/fields/createdBy'
import { modifiedBy } from '@/fields/modifiedBy'
import {
  SuperAdminOrClientAdmin,
  SuperAdminOrClientAdminOrCreatedBy,
  SuperAdminOrCreatedBy,
  SuperAdminOrSalesRep,
} from '@/helpers/accessControl'
import { CollectionSlugs, LeadSources, LeadStatuses } from '@/helpers/utils'
import { addAssignedTo } from '@/hooks/addAssignedTo'
import { addCreatedBy } from '@/hooks/addCreatedBy'
import { updateModifiedBy } from '@/hooks/updateModifiedBy'
import { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: CollectionSlugs.Leads,
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'lastName', 'status', 'assignedTo', 'note'],
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
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: false,
    },
    {
      name: 'source',
      label: 'Lead Source',
      type: 'select',
      options: Object.values(LeadSources).map((source) => ({
        label: source,
        value: source,
      })),
      defaultValue: LeadSources.Referral,
      required: true,
    },
    {
      name: 'status',
      label: 'Lead Status',
      type: 'select',
      options: Object.values(LeadStatuses).map((status) => ({
        label: status,
        value: status,
      })),
      defaultValue: LeadStatuses.New,
      required: true,
    },
    {
      name: 'note',
      label: 'Note',
      type: 'textarea',
      required: false,
    },
    {
      name: 'assignedTo',
      label: 'Assigned To',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        condition: (data) => Boolean(data?.id),
      },
    },
    createdBy,
    modifiedBy,
  ],
  access: {
    create: SuperAdminOrSalesRep,
    read: SuperAdminOrClientAdminOrCreatedBy,
    update: SuperAdminOrCreatedBy,
    delete: SuperAdminOrClientAdmin,
  },
  hooks: {
    beforeChange: [addCreatedBy, updateModifiedBy, addAssignedTo],
  },
}
