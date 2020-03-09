const router = require('express').Router()
const {Book, Review, User} = require('../db/models')
module.exports = router

const limitBooks = [10, 20]

router.get('/10/:pageId', async (req, res, next) => {
  try {
    const count = await Book.count()
    console.log('gimme count', count)
    const books = await Book.findAll({
      attributes: ['title', 'imageUrl', 'price', 'author', 'id'],
      limit: limitBooks[0],
      offset: (req.params.pageId - 1) * limitBooks[0]
    })
    if (books) res.send([books, count])
    else res.sendStatus(500)
  } catch (err) {
    next(err)
  }
})
router.get('/20/:pageId', async (req, res, next) => {
  try {
    const count = await Book.count()
    const books = await Book.findAll({
      attributes: ['title', 'imageUrl', 'price', 'author', 'id'],
      limit: limitBooks[1],
      offset: (req.params.pageId - 1) * limitBooks[1]
    })
    if (books) res.send([books, count])
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
