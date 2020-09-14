const faker = require('faker')
const moment = require('moment')
const peopleSchema = require('./people_schema')
const addressesSchema = require('./addresses_schema')

const contentTypes = {
  json: 'application/json; charset=utf-8'
}

const passingRootServerResponse = {
  server: 'MANTL fullstack javascript backend'
}

const passingHealthCheckResponse = {
  ok: true
}

const firstPerson = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  title: faker.name.jobTitle(),
  company: faker.company.companyName(),
  birthday: moment(faker.date.between('01-01-1985', '01-01-2000')).format('YYYY-MM-DD'),
  created_at: moment().toISOString()
}

const firstAddress = {
  line1: "301 East 69th st",
  line2: "apt 4e",
  city: faker.address.city(),
  state: faker.address.state(),
  zip: faker.address.zipCode()
}

module.exports = {
  contentTypes,
  firstPerson,
  firstAddress,
  peopleSchema,
  addressesSchema,
  passingRootServerResponse,
  passingHealthCheckResponse,
  dataContainer: {}
}
