const Sequelize = require('sequelize')
const db = require('../db')

const CardInformation = db.define('cardInformation', {
  number: {
    type: Sequelize.INTEGER, //Change later?
    allowNull: false,
    validate: {
      isEmpty: false
    }
  },
  zipCode: {
    type: Sequelize.INTEGER
  },
  expirationDate: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1000,
      max: 9999
    }
  }
})

module.exports = CardInformation
