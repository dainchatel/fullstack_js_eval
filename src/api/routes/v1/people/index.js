const statusCodes = require('../../../lib/httpStatusCodes')
const httpErrorMessages = require('../../../lib/httpErrorMessages')
const { database } = require('../../../lib/database')

module.exports = (api) => {
  /**
   * POST /v1/people
   * Create a new person
   */
  api.post('/', async (req, res, next) => {
    const person = await database('people').insert(req.body).returning('*');
    res
      .status(statusCodes.Created)
      .json(person[0])
  })

  /**
   * GET /v1/people/:personID
   * Retrieve a person by their ID
   */
  api.get('/:personID', async (req, res) => {
    const person = await database.select().from('people').where('id', req.params.personID)
    if (person.length > 0) {
      res
      .status(statusCodes.OK)
      .json(person[0])
    } else {
      res
      .status(statusCodes.NotFound)
      .json({"404": "Not Found"})
    }
  })

  /**
   * GET /v1/people
   * Retrieve a list of people
   */
  api.get('/', async (req, res) => {
    // have some pagination here? in case we have 1billion people
    const people = await database.select().from('people')
    res
      .status(statusCodes.OK)
      .json(people)
  })

  /**
   * Do not modify beyond this point until you have reached
   * TDD / BDD Mocha.js / Chai.js
   * ======================================================
   * ======================================================
   */

  /**
   * POST /v1/people/:personID/addresses
   * Create a new address belonging to a person
   **/
  api.post('/:personID/addresses', async (req, res) => {
    req.body.person_id = req.params.personID
    const address = await database('addresses').insert(req.body).returning('*')
    res
      .status(statusCodes.OK)
      .json(address[0])
  })

  /**
   * GET /v1/people/:personID/addresses/:addressID
   * Retrieve an address by it's addressID and personID
   **/
  api.get('/:personID/addresses/:addressID', async (req, res) => {
    console.log('helloooo')
    console.log(req.params)
    const address = await database.select().from('addresses').where({person_id: req.params.personID, id: req.params.addressID})
    res
      .status(statusCodes.OK)
      .json(address[0])
  })

  /**
   * GET /v1/people/:personID/addresses
   * List all addresses belonging to a personID
   **/
  api.get('/:personID/addresses', async (req, res) => {
    const addresses = await database.select().from('addresses').where({person_id: req.params.personID})
    res
      .status(statusCodes.OK)
      .json(httpErrorMessages.addresses)
  })

  /**
   * BONUS!!!!
   * DELETE /v1/people/:personID/addresses/:addressID
   * Mark an address as deleted by it's personID and addressID
   * Set it's deleted_at timestamp
   * Update the previous GET endpoints to omit rows where deleted_at is not null
   **/
  api.delete('/:personID/addresses/:addressID', async (req, res) => {
    res
      .status(statusCodes.NotImplemented)
      .json(httpErrorMessages.NotImplemented)
  })
}
