const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let userId = req.session.passport.user
    const order = await Order.findOne({
      userId: userId
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
  try {
    console.log('gimme req.body', req.body)
    let order = await OrderItem.findByPk(req.body.orderItemId)
    order.quantity = req.body.quantity
    order.save()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
