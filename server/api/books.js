const router = require('express').Router()
const {Book, Review, User} = require('../db/models')
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
      include: [{model: Review, include: [{model: User, attributes: ['name']}]}]
    })
    res.send(book)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    if (req.user) {
      await Review.create({
        review: req.body.review,
        rating: req.body.rating,
        bookId: req.params.id,
        userId: req.session.passport.user
      })
      const book = await Book.findByPk(req.params.id, {
        include: [
          {model: Review, include: [{model: User, attributes: ['name']}]}
        ]
      })
      res.status(201).send(book)
    } else res.sendStatus(403)
  } catch (err) {
    next(err)
  }
})
