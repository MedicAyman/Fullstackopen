require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/Person");
const app = express();
app.use("/", express.static("build"));
app.use(cors());

app.use(express.json());
// or morgan(tiny)
morgan.token("body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "-";
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const errorHandler = (error, req, res, next) => {
  if (error.name === "CastError")
    return res.status(400).send({ error: "Malformatted id" });

  next(error);
};
app.use(errorHandler)

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  res.type("html");
  res.send(
    `<p> there are ${
      persons.length
    } on the Phonebook now.</p> <p> ${new Date()} </p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
