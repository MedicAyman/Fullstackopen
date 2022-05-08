const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: {
    type: String,
    default: "0",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
