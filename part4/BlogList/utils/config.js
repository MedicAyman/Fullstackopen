require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
<<<<<<< HEAD
=======
//BlogListTest
>>>>>>> 4f8ab12baf3db4d9f2edd73533fb33ed67cb0b6b
module.exports = {
  PORT,
  MONGODB_URI,
};
