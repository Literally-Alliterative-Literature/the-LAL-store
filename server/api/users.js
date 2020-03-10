const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const checkToken = (req, res, next) => {
  if (!req.user) res.sendStatus(403)
  else if (req.user.adminAccess) next()
  else res.sendStatus(403)
}

router.get('/', checkToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'name', 'email', 'address', 'adminAccess']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.user) {
      res.sendStatus(403)
      return
    }

    if (req.user.adminAccess || req.user.id === req.params.id) {
      const user = await User.findByPk(req.params.id)
      res.json(user)
    } else res.sendStatus(403)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  if (!req.user) {
    //If you are not a logged in user, get the heck outta here.
    res.sendStatus(403)
  }
  try {
    const user = await User.findByPk(req.params.id)
    if (req.body.name) user.name = req.body.name
    if (req.body.email) user.email = req.body.email
    if (req.body.password) {
      user.password = req.body.password
    }
    if (req.body.address) user.address = req.body.address
    await user.save()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', checkToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'address', 'adminAccess']
    })
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})
