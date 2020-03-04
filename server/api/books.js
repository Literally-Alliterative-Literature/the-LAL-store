const router = require('express').Router()
const {Book, Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: ['title', 'imageUrl', 'price', 'author', 'id']
    })
    if (books) res.send(books)
    else res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{model: Review}]
    })
    res.send(book)
  } catch (err) {
    next(err)
  }
})
