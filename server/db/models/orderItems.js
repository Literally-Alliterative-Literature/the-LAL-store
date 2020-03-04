const Sequelize = require('sequelize')
const db = require('../db')
const Book = require('./books')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER
  },
  currentPrice: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

OrderItem.findNameByOrderId = async function(orderId) {
  return await this.findAll({
    where: {
      orderId
    },
    include: [
      {
        model: Book
      }
    ]
  })
}

module.exports = OrderItem
