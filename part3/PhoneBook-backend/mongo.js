const mongoose = require("mongoose");
//jKi4NDhdta70QzYe
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://Phonebook:${password}@cluster0.welon.mongodb.net/PhoneBook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  Person.find({}).then((persons) => {
    persons.forEach((p) => {
      console.log(p);
    });
    mongoose.connection.close();
    process.exit(1);
  });
}

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
