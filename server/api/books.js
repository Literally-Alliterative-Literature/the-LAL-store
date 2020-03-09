const router = require('express').Router()
const {Book, Review, User} = require('../db/models')
module.exports = router

const checkToken = (req, res, next) => {
  if (!req.user) res.sendStatus(403)
  else if (req.user.adminAccess) next()
  else res.sendStatus(403)
}

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: [
        'title',
        'imageUrl',
        'price',
        'author',
        'id',
        'quantity',
        'genre'
      ]
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

router.delete('/:id', checkToken, async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    await book.destroy()
    const books = await Book.findAll({
      attributes: [
        'title',
        'imageUrl',
        'price',
        'author',
        'id',
        'quantity',
        'genre'
      ]
    })
    res.status(200).send(books)
  } catch (err) {
    next(err)
  }
})
