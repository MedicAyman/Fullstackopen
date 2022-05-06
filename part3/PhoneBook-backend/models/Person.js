const mongoose = require("mongoose");
//jKi4NDhdta70QzYe

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log("connecting", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Could not connect to MongoDB: ", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true,
  },
  number: {
    type: String,
    require: true,
    validate: {
      validator: function (phone) {
        return /\d{3}-\d{3}-\d{4}/.test(phone);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
