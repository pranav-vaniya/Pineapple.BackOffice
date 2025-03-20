import { getPayload } from 'payload'
import config from '@payload-config'
import { LeadSources, LeadStatuses, UserRoles } from '@/helpers/utils'
import { superAdminsJson, clientAdminsJson, managersJson, salesRepsJson } from './users.json'
import { superAdminNotes, clientAdminNotes, managerNotes, salesRepNotes } from './notes.json'

// this line may show the following warning
// Module '"/home/node/Projects/PayloadProjects/Pineapple.BackOffice/src/seed/leads"' has no exported member 'leadsJson'.
// It is due to the large filesize, no worries
import { leadsJson } from './leads.json'

const payload = await getPayload({ config })
console.log('\nStarted seeding ...\n')

async function seed() {
  try {
    var i = null
    var j = null
    var data = null
    var userid = null
    var note: string[] = []

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
        limit: 10000,
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
        limit: 10000,
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
        limit: 10000,
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
        limit: 10000,
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

    // seed notes
    const allUsers = (
      await payload.find({
        collection: 'users',
        limit: 10000,
      })
    ).docs

    const getRandomSuperAdminNote = () => {
      return superAdminNotes[Math.floor(Math.random() * superAdminNotes.length)]
    }

    const getRandomClientAdminNote = () => {
      return clientAdminNotes[Math.floor(Math.random() * clientAdminNotes.length)]
    }

    const getRandomManagerNote = () => {
      return managerNotes[Math.floor(Math.random() * managerNotes.length)]
    }

    const getRandomSalesRepNote = () => {
      return salesRepNotes[Math.floor(Math.random() * salesRepNotes.length)]
    }

    for (const user of allUsers) {
      data = {
        title: '',
        note: '',
        createdBy: user.id,
        modifiedBy: user.id,
      }

      for (i = 0; i < 8; i++) {
        if (user.role === UserRoles.SuperAdmin) note = getRandomSuperAdminNote()
        else if (user.role === UserRoles.ClientAdmin) note = getRandomClientAdminNote()
        else if (user.role === UserRoles.Manager) note = getRandomManagerNote()
        else if (user.role === UserRoles.SalesRep) note = getRandomSalesRepNote()

        data.title = note[0]
        data.note = note[1]

        await payload.create({
          collection: 'notes',
          data: data,
        })
      }

      console.log(`Added Notes for ${user.username}`)
    }
  } catch (error) {
    console.error(JSON.stringify(error))
    process.exit(0)
  } finally {
    process.exit(0)
  }
}

await seed()

console.log('\nFinished seeding ...\n')
