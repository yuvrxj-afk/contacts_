const express = require('express')
const router = express.Router()
const {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact } = require('../controllers/contactController')
const validateToken = require('../middleware/validateToken')

router.use(validateToken)

// get all // create
router.route('/').get(getContacts).post(createContact)

// particular contact// update// delete
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)


module.exports = router