const User = require('./users')
const Book = require('./books')
const CardInformation = require('./card_information')
const OrderItem = require('./orderItems')
const Order = require('./orders')
const Review = require('./reviews')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
User.hasMany(CardInformation)
CardInformation.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Book.hasMany(Review)
Review.belongsTo(Book)

User.hasMany(Order)
Order.belongsTo(User)

Book.hasMany(OrderItem)
OrderItem.belongsTo(Book)

Order.hasMany(OrderItem)
OrderItem.belongsTo(Order)

module.exports = {
  User,
  Book,
  CardInformation,
  OrderItem,
  Order,
  Review
}
