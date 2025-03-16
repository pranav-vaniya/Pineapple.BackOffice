export const CollectionSlugs = {
  Users: 'users',
  Media: 'media',
  Leads: 'leads',
}

export enum UserRoles {
  SalesRep = 'Sales Representative',
  Manager = 'Manager',
  ClientAdmin = 'Client Administrator',
  SuperAdmin = 'Super Administrator',
}

export enum LeadSources {
  Referral = 'Referral',
  SocialMedia = 'Social Media',
  Website = 'Website',
  Event = 'Event',
  Advertisement = 'Advertisement',
}

export enum LeadStatuses {
  New = 'New',
  Contacted = 'Contacted',
  FollowUp = 'Follow Up',
  Converted = 'Converted',
  Lost = 'Lost',
}
