const Sequelize = require('sequelize')
const db = require('../db')

const Book = db.define('book', {
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  genre: {
    type: Sequelize.STRING
  },
  synopsis: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/rewriting.jpg'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 10
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  ratings: {
    type: Sequelize.FLOAT,
    validate: {
      min: 1,
      max: 5
    }
  }
})

module.exports = Book
