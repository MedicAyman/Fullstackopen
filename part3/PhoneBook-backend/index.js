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

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log("request body: ", req.body);
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content or number is missing",
    });
  }
  if (persons.find((p) => p.name.toUpperCase() === body.name.toUpperCase())) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  persons = persons.concat(person);

  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
