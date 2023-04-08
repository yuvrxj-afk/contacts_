const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})

// @desc create contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    })
    console.log(name, email, phone);
    res.status(201).json(contact)
})

// @desc update contact
// @route PUT /api/contacts
// @access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('No Contact Found')
    }
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updated)
})

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('No Contact Found')
    }
    await Contact.findByIdAndDelete(contact)
    res.status(200).json(contact)
})

// @desc Get particular contact
// @route GET /api/contacts?:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('No Contact Found')
    }
    res.status(200).json(contact)
})

module.exports = { getContact, getContacts, createContact, deleteContact, updateContact }