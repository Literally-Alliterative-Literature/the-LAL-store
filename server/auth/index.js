const router = require('express').Router()
const User = require('../db/models/users')
const Order = require('../db/models/orders')
const OrderItem = require('../db/models/orderItems')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }

    //check for guest cart
    if (req.session.shoppingCart) {
      //If the shopping cart has length > 0, move all items to your existing cart and then empty cart.
      let userId = req.session.passport.user
      const order = await Order.findOrCreate({where: {userId, status: 'cart'}})
      let orderGuestCart = order[0].toJSON()
      for (let i = 0; i < req.session.shoppingCart.length; i++) {
        await OrderItem.create({
          orderId: orderGuestCart.id,
          bookId: req.session.shoppingCart[i].bookId,
          currentPrice: req.session.shoppingCart[i].currentPrice,
          quantity: req.session.shoppingCart[i].quantity
        })
      }
      req.session.shoppingCart = []
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log('req.body', req.body)
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
