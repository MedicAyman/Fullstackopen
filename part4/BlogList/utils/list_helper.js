var _ = require("lodash");
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const totalLikes = (blogs) => {
  let likes = blogs.reduce((total, blog) => total + blog.likes, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  let highest_amount_of_likes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === highest_amount_of_likes);
};

const mostBlogs = (blogs) => {
  let authorsByPostsNumber = _.chain(blogs).countBy("author").value();

  let maxKey = _.maxBy(_.keys(authorsByPostsNumber), (author) => {
    return authorsByPostsNumber[author];
  });
  /**
   * ES6 alternative:
   * let maxKey = Object.keys(authorsByPostsNumber).reduce((acc, currentOrder) => {
   *  authorsByPostsNumber[acc] > authorsByPostsNumber[currentOrder] ? acc : currentOrder
   * })
   */
  return { author: maxKey, blogs: authorsByPostsNumber[maxKey] };
};

const mostLikedAuthor = (blogs) => {
  let author_likes = blogs.map((blog) => {
    return { author: blog.author, likes: blog.likes };
  });

  /**
   * { author: 'Michael Chan', likes: 7 },
     { author: 'Edsger W. Dijkstra', likes: 5 },
     { author: 'Edsger W. Dijkstra', likes: 12 },
   */

  //merge same authors
  let likesCounts = author_likes.reduce((likesCount, author) => {
    likesCount[author.author] = (likesCount[author.author] || 0) + author.likes;
    return likesCount;
  }, {});
  console.log("MostLikesAuthor: ", likesCounts);
};
module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikedAuthor,
};
