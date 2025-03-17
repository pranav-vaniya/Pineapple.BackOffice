import { getPayload } from 'payload'
import config from '@payload-config'
import { LeadSources, LeadStatuses, UserRoles } from '@/helpers/utils'
import { superAdminsJson, clientAdminsJson, managersJson, salesRepsJson } from './users.json'

// this line may show the following warning
// Module '"/home/node/Projects/PayloadProjects/Pineapple.BackOffice/src/seed/leads"' has no exported member 'leadsJson'.
// It is due to the large filesize, no worries
import { leadsJson } from './leads.json'

const payload = await getPayload({ config })
console.log('\nStarted seeding ...\n')

async function seed() {
  try {
    var i = null
    var data = null
    var userid = null

    // insert super admins
    var jsonLength = superAdminsJson.length

    for (i = 0; i < jsonLength; i++) {
      data = {
        ...superAdminsJson[i],
        role: superAdminsJson[i].role as
          | 'Super Administrator'
          | 'Client Administrator'
          | 'Manager'
          | 'Sales Representative',
      }

      await payload.create({
        collection: 'users',
        data: data,
      })

      console.log(`Added ${UserRoles.SuperAdmin} (${i + 1}/${jsonLength}): ${data.username}`)
    }

    // insert client admins
    var jsonLength = clientAdminsJson.length

    const superAdminIds = (
      await payload.find({
        collection: 'users',
        where: { role: { equals: UserRoles.SuperAdmin } },
      })
    ).docs.map((user) => user.id)

    const getRandomSuperAdminId = () => {
      return superAdminIds[Math.floor(Math.random() * superAdminIds.length)]
    }

    for (i = 0; i < jsonLength; i++) {
      userid = getRandomSuperAdminId()
      data = {
        ...clientAdminsJson[i],
        role: clientAdminsJson[i].role as
          | 'Super Administrator'
          | 'Client Administrator'
          | 'Manager'
          | 'Sales Representative',
      }
      data.createdBy = userid
      data.modifiedBy = userid

      await payload.create({
        collection: 'users',
        data: data,
      })

      console.log(`Added ${UserRoles.ClientAdmin} (${i + 1}/${jsonLength}): ${data.username}`)
    }

    // insert managers
    var jsonLength = managersJson.length

    const clientAdminIds = (
      await payload.find({
        collection: 'users',
        where: { role: { equals: UserRoles.ClientAdmin } },
      })
    ).docs.map((user) => user.id)

    const getRandomClientAdminId = () => {
      return clientAdminIds[Math.floor(Math.random() * clientAdminIds.length)]
    }

    for (i = 0; i < jsonLength; i++) {
      userid = getRandomClientAdminId()
      data = {
        ...managersJson[i],
        role: managersJson[i].role as
          | 'Super Administrator'
          | 'Client Administrator'
          | 'Manager'
          | 'Sales Representative',
      }
      data.createdBy = userid
      data.modifiedBy = userid

      await payload.create({
        collection: 'users',
        data: data,
      })

      console.log(`Added ${UserRoles.Manager} (${i + 1}/${jsonLength}): ${data.username}`)
    }

    // insert salesreps
    var jsonLength = salesRepsJson.length

    const managerIds = (
      await payload.find({
        collection: 'users',
        where: { role: { equals: UserRoles.Manager } },
      })
    ).docs.map((user) => user.id)

    const getRandomManagerId = () => {
      return managerIds[Math.floor(Math.random() * managerIds.length)]
    }

    for (i = 0; i < jsonLength; i++) {
      userid = getRandomClientAdminId()
      data = {
        ...salesRepsJson[i],
        role: salesRepsJson[i].role as
          | 'Super Administrator'
          | 'Client Administrator'
          | 'Manager'
          | 'Sales Representative',
      }
      data.createdBy = userid
      data.modifiedBy = userid
      data.reportsTo = getRandomManagerId()

      await payload.create({
        collection: 'users',
        data: data,
      })

      console.log(`Added ${UserRoles.SalesRep} (${i + 1}/${jsonLength}): ${data.username}`)
    }

    // insert leads
    var jsonLength = leadsJson.length

    const salesRepsIds = (
      await payload.find({
        collection: 'users',
        where: { role: { equals: UserRoles.SalesRep } },
      })
    ).docs.map((user) => user.id)

    const getRandomSalesRepId = () => {
      return salesRepsIds[Math.floor(Math.random() * salesRepsIds.length)]
    }

    const leadSourcesArray = Object.values(LeadSources)
    const leadSourcesArrayLength = leadSourcesArray.length
    const leadStatusesArray = Object.values(LeadStatuses)
    const leadStatusesArrayLength = leadStatusesArray.length

    for (i = 0; i < jsonLength; i++) {
      userid = getRandomSalesRepId()
      data = leadsJson[i]
      data.email = data.firstName + '.' + data.lastName + '@pineapple.org'
      data.source = leadSourcesArray[Math.floor(Math.random() * leadSourcesArray.length)]
      data.status = leadStatusesArray[Math.floor(Math.random() * leadStatusesArray.length)]
      data.createdBy = userid
      data.modifiedBy = userid
      data.assignedTo = userid

      await payload.create({
        collection: 'leads',
        data: data,
      })

      console.log(`Added Lead (${i + 1}/${jsonLength}): ${data.firstName} ${data.lastName}`)
    }
  } catch (error) {
    console.error(JSON.stringify(error))
    process.exit(0)
  } finally {
    process.exit(0)
  }
}

await seed()
