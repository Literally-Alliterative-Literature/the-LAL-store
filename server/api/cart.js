const router = require('express').Router()
const {User, Order, OrderItem} = require('../db/models')
module.exports = router
//Add it to index!!!!
router.get('/', async (req, res, next) => {
  try {
    console.log('req.body is', req.body)
    // const order = await Order.findOne({

    // })
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
