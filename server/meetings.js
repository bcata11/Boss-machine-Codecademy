const meetingsRouter = require('express').Router()

const {
    addToDataBase,
    createMeeting,
    deleteAllFromDatabase,
    getAllFromDatabase
} = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDataBase('meetings', createMeeting())
    res.status(201).send(newMeeting) 
})

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))

})

module.exports = meetingsRouter