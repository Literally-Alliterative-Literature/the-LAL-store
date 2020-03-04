const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router
//Add it to index!!!!
router.get('/', async (req, res, next) => {
  try {
    let userId = req.session.passport.user
    const order = await Order.findOne({
      userId: userId
    })

    let jsonOrder = order.toJSON()
    let kylieOrderItem = await OrderItem.findNameByOrderId(jsonOrder.id)
    // console.log('gimme kylies order', kylieOrderItem)
    // let kylieToJson = kylieOrderItem[0].toJSON()
    // console.log('gimme new Kylie', kylieToJson)
    // const cart = await OrderItem.findAll({
    //   where: {orderId: jsonOrder.id}
    // })
    let jsonArray = []
    for (let i = 0; i < kylieOrderItem.length; i++) {
      jsonArray.push(kylieOrderItem[i].toJSON())
    }
    console.log('finished route')
    res.status(200).json(jsonArray)
  } catch (err) {
    next(err)
  }
})
