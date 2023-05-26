const ideasRouter = require('express').Router()

module.exports = ideasRouter

const {
    getAllFromDataBase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db')

const checkMillionDollarIdea = require('./checkMillionDollarIdea')

ideasRouter.param('ideaId', (req,res,next, id) => {
    const idea = getFromDatabaseById('ideas', id)
    if(idea) {
        req.idea = idea;
        next()
    } else {
        res.status(404).send();
    }
})

ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDataBase('ideas'))
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea)
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body)
    res.send(updateIdea)
})

ideasRouter.delete('/:ideaId', (req, res, send) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId )
    if (deletedIdea) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})