'use strict'

const db = require('../server/db')
const Faker = require('faker')
const {User, Book, Order, OrderItem, Review} = require('../server/db/models')

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

const imageSeed = [
  '/images/rewriting.jpg',
  '/images/orly.jpg',
  '/images/orly1.jpg',
  '/images/orly2.jpg',
  '/images/orly3.jpg',
  '/images/orly4.jpg',
  '/images/orly5.jpg',
  '/images/orly6.jpg',
  '/images/orly7.jpg',
  '/images/orly8.png',
  '/images/orly9.jpg',
  '/images/orly10.jpg',
  '/images/orly11.jpg',
  '/images/orly12.jpg',
  '/images/orly13.jpg',
  '/images/orly14.jpg',
  '/images/orly15.jpg',
  '/images/orly16.jpg',
  '/images/orly17.jpg',
  '/images/orly18.jpg',
  '/images/orly19.jpg'
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'fullstack@email.com',
      password: '123',
      name: 'Grandma who bakes cookies',
      address: '123 Court Lane',
      adminAccess: true
    }),
    User.create({
      email: 'lal@email.com',
      password: '321',
      name: 'Beautiful Milos',
      address: '123 Court Lane'
    })
  ])

  const books = await Promise.all([
    Book.create({
      author: 'Jason',
      title: '50 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Twilight spinoff garbage',
      imageUrl: imageSeed[0],
      price: 2,
      quantity: 5000,
      ratings: 5
    }),
    Book.create({
      author: 'Jason',
      title: '51 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Jasons saga continues',
      imageUrl: imageSeed[1],
      price: 10,
      quantity: 5000,
      ratings: 5
    }),
    Book.create({
      author: 'Jason',
      title: '52 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Jason is unstoppable  wink wink',
      imageUrl: imageSeed[2],
      price: 100,
      quantity: 5000,
      ratings: 5
    })
  ])

  let counter = 3
  for (let i = 0; i < 100; i++) {
    await Book.create({
      author: Faker.name.findName(),
      title: Faker.company.catchPhrase(),
      genre: 'Steamy Romance',
      imageUrl: imageSeed[counter],
      synopsis: Faker.lorem.paragraph(),
      price: getRandomInt(5, 30),
      quantity: Faker.random.number(),
      ratings: 3
    })
    counter++
    if (counter > 19) counter = 0
  }

  for (let i = 0; i < 100; i++) {
    await User.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      address: Faker.address.streetAddress()
    })
  }

  await User.create({
    email: 'lal1@email.com',
    password: '123',
    name: 'Yoyoyoyoyoyoyoyoyo',
    address: '123 Court Lane',
    adminAccess: false
  })

  const order = await Promise.all([
    Order.create({status: 'cart', userId: 1}),
    Order.create({status: 'cart', userId: 2}),
    Order.create({status: 'purchased', userId: 1}),
    Order.create({status: 'cart', id: -1})
  ])
  const orderItems = await Promise.all([
    OrderItem.create({quantity: 10, currentPrice: 10, orderId: 1, bookId: 2}),
    OrderItem.create({quantity: 10, currentPrice: 10, orderId: 2, bookId: 3}),
    OrderItem.create({quantity: 10, currentPrice: 10, orderId: 3, bookId: 5})
  ])

  for (let i = 0; i < 300; i++) {
    await Review.create({
      review: Faker.lorem.paragraph(),
      rating: getRandomInt(1, 6),
      userId: getRandomInt(1, 102),
      bookId: getRandomInt(1, 104)
    })
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} books`)
  console.log(`seeded ${order.length} order`)
  console.log(`seeded ${orderItems.length} order`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
