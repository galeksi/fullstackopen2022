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
  books.filter((b) => b.author.name === author);

const filterByGenre = (books, genre) =>
  books.filter((b) => b.genres.find((g) => g === genre));

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate("author");
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
      const author = await Author.findOne({ _id: root.author });
      return {
        id: root.id,
        name: author.name,
        born: author.born,
      };
    },
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({});
      const booksByAuthor = books.filter(
        (b) => JSON.stringify(b.author) === JSON.stringify(root._id)
      );
      return booksByAuthor.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }
      const book = new Book({ ...args, author: author._id });
      return book.save();
    },
    editAuthor: async (root, args) => {
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
