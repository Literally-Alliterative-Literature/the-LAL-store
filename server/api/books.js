const router = require('express').Router()
const {Book, Review, User} = require('../db/models')
const Sequelize = require('sequelize')

module.exports = router

router.get('/:limit/:pageId/:search(*)', async (req, res, next) => {
  try {
    const count = await Book.count()
    const books = await Book.findAll({
      attributes: ['title', 'imageUrl', 'price', 'author', 'id'],
      limit: parseInt(req.params.limit),
      where: {title: {[Sequelize.Op.iLike]: `%${req.params.search}%`}},
      offset: (req.params.pageId - 1) * parseInt(req.params.limit)
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

router.get('/search/:searchParam', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      where: {
        search: req.params.title
      }
    })
    console.log(req.params)
    res.json(books)
  } catch (err) {
    next(err)
  }
})
