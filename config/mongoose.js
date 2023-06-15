const mongoose = require("mongoose");
// mongoose.set('strictQuery', false);
const mongoDB = "mongodb://127.0.0.1/contact_list_db"; 
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log('successfull connected to database');
}