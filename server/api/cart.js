const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log('session is', req.session)

  try {
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
    console.log('req.params is: ', req.params.itemId)
    let order = await OrderItem.findByPk(req.params.itemId)
    await order.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
