const router = require('express').Router()
const {Book, Order, OrderItem} = require('../db/models')
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
    return
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

router.post('/', async (req, res, next) => {
  if (!req.user) {
    //check if user exists. If not, add item to session guest shoppingCart instead
    const book = await Book.findByPk(req.body.book.id)
    //need to attach the book to this shoppingObj in order to mimic the return from our actual shopping cart.

    // req.session.shoppingCart = [] //temporary solution to clear guest shoppingCart. Will delete later.

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
    return
  }
  try {
    let userId = req.session.passport.user
    const order = await Order.findOrCreate({where: {userId, status: 'cart'}})
    let orderToJason = order[0].toJSON()
    await OrderItem.create({
      orderId: orderToJason.id,
      bookId: req.body.book.id,
      currentPrice: req.body.book.price,
      quantity: req.body.quantity
    })
    let kylieOrderItem = await OrderItem.findNameByOrderId(orderToJason.id)
    res.status(200).json(kylieOrderItem)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  if (!req.user) {
    //check if user exists. If not, modify guest shopping cart instead.
    for (let i = 0; i < req.session.shoppingCart.length; i++) {
      if (req.body.orderItemId === req.session.shoppingCart[i].id) {
        req.session.shoppingCart[i].quantity = req.body.quantity
      }
    }
    res.sendStatus(200)
    return
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
  try {
    let order = await OrderItem.findByPk(req.params.itemId)
    await order.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
