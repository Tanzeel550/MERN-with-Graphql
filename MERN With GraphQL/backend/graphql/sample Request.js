// {
//   user {
//     id
//     createdEvents {
//       id
//       title
//       description
//     }
//   }
//   event {
//     creator {
//       id
//     }
//   }
//   bookings {
//     id
//     event {
//       id
//       title
//       description
//     }
//     user {
//       id
//       email
//       password
//     }
//   }
//   login(email: "tanzeelahmed550@gmail.com", password: "123456789") {
//     token
//     user {
//       id
//       email
//       password
//     }
//   }
// }

// mutation {
//   createEvent(data: {title: "E", description: "EEEE", price: 1234, date: "1999", creator: "601a92b0db945c17b03bf4ca"}) {
//     id
//     title
//     creator {
//       id
//       email
//       password
//     }
//   }
//   createUser(data: {email: "tanzeelahmed550@gmail.com", password: "123456789"}) {
//     id
//     email
//     password
//     createdEvents {
//       title
//     }
//   }
//   createBooking(eventID: "601a94120a94921888a5c6a3") {
//     id
//     createdAt
//     updatedAt
//     event {
//       title
//       description
//     }
//     user {
//       id
//       email
//       password
//     }
//   }
//   cancelBooking(bookingID: "601a97166056131c5baabf0b") {
//     id
//     createdAt
//     updatedAt
//     event {
//       title
//       description
//     }
//     user {
//       id
//       email
//       password
//     }
//   }
// }
