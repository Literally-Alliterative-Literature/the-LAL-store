const router = require('express').Router()
const {Book, Order, OrderItem} = require('../db/models')
const {Op} = require('sequelize')

module.exports = router

router.get('/', async (req, res, next) => {
  if (!req.user) {
    //check if user exists.
    if (req.session.shoppingCart) {
      //check if guest shoppingCart exists in session. If it does, send it back.
      res.status(200).json(req.session.shoppingCart)
    } else {
      //if guest shoppingCart does not exist in session, create it
      req.session.shoppingCart = []
      res.status(200).json(req.session.shoppingCart)
    }
    return //if guest user, do not run any more code
  }
  try {
    //get shopping cart for a user
    const order = await Order.findOne({
      where: {userId: req.session.passport.user}
    })
    let jsonOrder = order.toJSON()
    let kylieOrderItem = await OrderItem.findNameByOrderId(jsonOrder.id)
    let jsonArray = []
    for (let i = 0; i < kylieOrderItem.length; i++) {
      jsonArray.push(kylieOrderItem[i].toJSON())
    }
    res.status(200).json(jsonArray)
  } catch (err) {
    next(err)
  }
})

router.get('/orderhistory', async (req, res, next) => {
  if (!req.user) {
    //if you're not a user, nothing here for you baby
    res.sendStatus(403)
    return
  }
  try {
    const orderCount = await Order.findAll({
      where: {
        userId: req.user.id,
        [Op.or]: [{status: 'processed'}, {status: 'purchased'}]
      },
      include: [
        {
          model: OrderItem,
          include: [{model: Book, attributes: ['title', 'author', 'id']}]
        }
      ]
    })
    res.status(200).json(orderCount)
    //check how many orders that were processed or purchased for that user
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //check if user exists. If not, add item to session guest shoppingCart instead
  if (!req.user) {
    // check if book order already exists in shopping cart
    let checkBook = false
    for (let i = 0; i < req.session.shoppingCart.length; i++) {
      if (req.session.shoppingCart[i].bookId === req.body.book.id) {
        //if book does exist, increase quantity
        checkBook = true
        req.session.shoppingCart[i].quantity =
          req.session.shoppingCart[i].quantity * 1 + req.body.quantity * 1
      }
    }
    if (checkBook === true) {
      //if the book was already in the cart and the quantity was increased, send back shopping cart and end function
      res.status(200).json(req.session.shoppingCart)
      return
    }

    //need to attach the book to this shoppingObj in order to mimic the return from our actual shopping cart.
    const book = await Book.findByPk(req.body.book.id)

    //guestShoppingObj is an object that holds the exact same data as our actual shopping cart's objects would. This will make it easier to put it into the database later.
    let guestShoppingObj = {
      id: req.session.shoppingCart.length + 1,
      orderId: -1,
      bookId: req.body.book.id,
      currentPrice: req.body.book.price,
      quantity: req.body.quantity,
      book
    }

    req.session.shoppingCart.push(guestShoppingObj)
    res.status(200).json(req.session.shoppingCart)

    return //if guest user, do not run any more code
  }
  try {
    let userId = req.session.passport.user
    const order = await Order.findOrCreate({where: {userId, status: 'cart'}})
    let orderToJason = order[0].toJSON()
    //check if the book already exists in the order
    const amount = await OrderItem.count({
      where: {orderId: orderToJason.id, bookId: req.body.book.id}
    })

    //if it does exist in the current order, increase its quantity
    if (amount !== 0) {
      const existingOrderItem = await OrderItem.findOne({
        where: {orderId: orderToJason.id, bookId: req.body.book.id}
      })
      existingOrderItem.quantity =
        existingOrderItem.quantity * 1 + req.body.quantity * 1
      existingOrderItem.save()
    } else {
      //if it does not exist in the current order, create it
      await OrderItem.create({
        orderId: orderToJason.id,
        bookId: req.body.book.id,
        currentPrice: req.body.book.price,
        quantity: req.body.quantity
      })
    }
    let kylieOrderItem = await OrderItem.findNameByOrderId(orderToJason.id)
    res.status(200).json(kylieOrderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  //check if user exists. If not, modify guest shopping cart instead.
  if (!req.user) {
    for (let i = 0; i < req.session.shoppingCart.length; i++) {
      if (req.body.orderItemId === req.session.shoppingCart[i].id) {
        req.session.shoppingCart[i].quantity = req.body.quantity
      }
    }
    res.sendStatus(200)
    return //if guest user, do not run any more code
  }
  try {
    let order = await OrderItem.findByPk(req.body.orderItemId)
    order.quantity = req.body.quantity
    order.save()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  //check if user exists. If not, delete from guest shopping cart instead.req.session.shoppingCart)
  if (!req.user) {
    for (let i = 0; i < req.session.shoppingCart.length; i++) {
      //loosely equals used here because itemId is a string and the shoppingcart id is a number
      if (req.params.itemId == req.session.shoppingCart[i].id) {
        req.session.shoppingCart.splice(i, 1)
      }
    }
    res.sendStatus(200)
    return //if guest user, do not run any more code
  }
  try {
    let order = await OrderItem.findByPk(req.params.itemId)
    await order.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.put('/purchase', async (req, res, next) => {
  if (!req.user) {
    //purchase from guest cart and save to database as orderId -1
    console.log('req.session is: ', req.session)
    try {
      req.session.shoppingCart.forEach(async order => {
        await OrderItem.create({
          orderId: order.orderId,
          bookId: order.bookId,
          currentPrice: order.currentPrice,
          quantity: order.quantity
        })
      })
      req.session.shoppingCart = []
      res.sendStatus(200)
      return
    } catch (err) {
      next(err)
    }
  }

  //purchase from user cart and change order to 'processed'
  try {
    const order = await Order.findOne({
      where: {userId: req.session.passport.user, status: 'cart'}
    })
    order.status = 'processed'
    order.save()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
