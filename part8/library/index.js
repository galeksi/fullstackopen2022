const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");
const { v1: uuid } = require("uuid");

require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = gql`
  type Author {
    name: String
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const filterByAuthor = (books, author) =>
  books.filter((b) => b.author === author);
const filterByGenre = (books, genre) =>
  books.filter((b) => b.genres.find((g) => g === genre));

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const byAuthor = filterByAuthor(books, args.author);
        const byGenre = filterByGenre(byAuthor, args.genre);
        return byGenre;
      } else if (args.author) {
        return filterByAuthor(books, args.author);
      } else if (args.genre) {
        return filterByGenre(books, args.genre);
      } else {
        return Book.find({});
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Book: {
    author: async (root) => {
      const author = await Author.findOne({ id: root.id });
      return {
        id: root.id,
        name: author.name,
        born: author.born,
      };
    },
  },
  Author: {
    bookCount: (root) => {
      const booksByAuthor = books.filter((b) => b.author === root.name);
      return booksByAuthor.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      // const author = authors.find((a) => a.name === args.author);
      // if (!author) {
      //   const newAuthor = {
      //     name: args.author,
      //     id: uuid(),
      //     born: null,
      //   };
      //   authors = authors.concat(newAuthor);
      // }
      // const book = { ...args, id: uuid() };
      // books = books.concat(book);
      // return book;
      const author = new Author({ name: args.author });
      await author.save();
      const book = new Book({ ...args, author: author._id });
      return book.save();
    },
    editAuthor: async (root, args) => {
      // const author = authors.find((a) => a.name === args.name);
      // if (!author) {
      //   return null;
      // }
      // const updatedAuthor = { ...author, born: args.setBornTo };
      // authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      // return updatedAuthor;
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      return author.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
