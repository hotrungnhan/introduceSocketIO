// require('dotenv').config()
// const mongoose = require('mongoose')
// const config = {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// }
// mongoose.connect(process.env.DB_hostname, config);
// const db = mongoose.connection;
// db.on("error", () => {
//     console.log("> error occurred from the database");
// });
// db.once("open", () => {
//     console.log("> successfully opened the database");
// });
// module.exports={mongoose}