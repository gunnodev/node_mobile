//generator.js

// import chance instance
const chance = require('chance').Chance()

// customer object data
let customerid = 0
const createCustomer = () => {
  customerid++
  return {
    id: customerid,
    firstname: chance.first(), // random firstname
    lastname: chance.last(),   // random lastname
    birthday: chance.birthday({ string: true }), // random birthday
    gender: chance.gender(),   // random gender
    avatar: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }), // random avatar url
  }
}

// company object data
let companyid = 0
const createCompany = () => {
  companyid++
  return {
    id: companyid,
    companyName: chance.company(), // random company name
    email: chance.email(),         // random email
    website: chance.url(),         // random url
    tel: chance.phone(),           // random mobile phone
    address: chance.address(),     // random address
  }
}

let newsid = 0
const createNews = () => {
    newsid++
  return {
    id: newsid,
    topic: chance.sentence(), // random company name
    content: chance.paragraph(),         // random email
    dateTime: chance.birthday({string: true, american: false}),         // random url
    //tel: chance.phone(),           // random mobile phone
    //address: chance.address(),     // random address
  }
}

// create mixin for use in other files
// usage: chance.customerProfile()
chance.mixin({
  customerProfile: createCustomer,
  companyProfile: createCompany,
  newsProfile: createNews
})

// export generate customers and companies
module.exports = {
  customers: (n) => chance.n(chance.customerProfile, n), // create n customer profiles
  companies: (n) => chance.n(chance.companyProfile, n),  // create n companie profiles
  news: (n) => chance.n(chance.newsProfile, n),  // create n companie profiles
}