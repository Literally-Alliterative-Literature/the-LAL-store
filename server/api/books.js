const router = require('express').Router()
const {Book, Review, User} = require('../db/models')
module.exports = router

const checkToken = (req, res, next) => {
  if (!req.user) res.sendStatus(403)
  else if (req.user.adminAccess) next()
  else res.sendStatus(403)
}

const limitBooks = [10, 20]

router.get('/10/:pageId', async (req, res, next) => {
  try {
    const count = await Book.count()
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

router.get('/admin', checkToken, async (req, res, next) => {
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
    res.status(200).send(books)
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

router.post('/', checkToken, async (req, res, next) => {
  try {
    await Book.create(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkToken, async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)

    if (req.body.title) book.title = req.body.title
    if (req.body.author) book.author = req.body.author
    if (req.body.imageUrl) book.imageUrl = req.body.imageUrl
    if (req.body.price) book.price = req.body.price
    if (req.body.quantity) book.quantity = req.body.quantity
    if (req.body.synopsis) book.synopsis = req.body.synopsis
    if (req.body.genre) book.genre = req.body.genre

    await book.save()

    res.sendStatus(200)
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
