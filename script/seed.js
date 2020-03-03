'use strict'

const db = require('../server/db')
const Faker = require('faker')
const {User, Book, Order} = require('../server/db/models')

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'fullstack@email.com',
      password: '123',
      name: 'Phone',
      address: '123 Court Lane'
    })
  ])

  const books = await Promise.all([
    Book.create({
      author: 'Jason',
      title: '50 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Twilight spinoff garbage',
      price: 2,
      quantity: 5000,
      ratings: 5
    }),
    Book.create({
      author: 'Jason',
      title: '51 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Jasons saga continues',
      price: 10,
      quantity: 5000,
      ratings: 5
    }),
    Book.create({
      author: 'Jason',
      title: '52 shades of Jason',
      genre: 'Steamy Romance',
      synopsis: 'Jason is unstoppable  wink wink',
      price: 100,
      quantity: 5000,
      ratings: 5
    })
  ])

  for (let i = 0; i < 100; i++) {
    await Book.create({
      author: Faker.name.findName(),
      title: Faker.company.catchPhrase(),
      genre: 'Steamy Romance',
      synopsis: Faker.lorem.paragraph(),
      price: getRandomInt(5, 30),
      quantity: Faker.random.number(),
      ratings: 3
    })
  }

  for (let i = 0; i < 100; i++) {
    await User.create({
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password: Faker.internet.password(),
      address: Faker.address.streetAddress()
    })
  }

  const order = await Promise.all([
    Order.create({status: 'cart', userId: 1}),
    Order.create({status: 'cart', userId: 2}),
    Order.create({status: 'purchased', userId: 1})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${books.length} books`)
  console.log(`seeded ${order.length} order`)
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
