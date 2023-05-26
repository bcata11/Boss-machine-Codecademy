const minionsRouter = require('express').Router()

module.exports = minionsRouter

const {
    getAllFromDataBase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db')

minionsRouter.param('minionsId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id)
    if (minion) {
        req.minion = minion;
        next()
    } else {
        res.status(404).send()
    }
})

minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDataBase('minions'))
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)
})

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion)
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body)
    res.send(updatedMinion)
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId)
    if (deletedMinion) {
        res.status(204)
    } else {
        res.status(500)
    }
})


//bonus

minionsRouter.get('/:minionId/work', (req, res, next) => {
    const work = getAllFromDataBase('work').filter(load => {
        return load.id === req.params.minionId
    })
    res.send(work)
})

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', req.body)
    res.status(201).send(newWork)
})

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id)

    if (work) {
        req.work = work
        next()
    } else {
        res.status(404).send()
    }
})

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    const updatedWork = updateInstanceInDatabase('work', req.body)
})

minionsRouter.delete('/:minionId/work/:workId', (req, res, next)=>{
    const deletedWork = deleteFromDatabasebyId('work', req.params.workId)
    if(deletedWork) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})