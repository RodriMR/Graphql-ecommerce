const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello: [String!]!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  type Product {
    name: String!
    description: String!
    image: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return ["Wzup", "Hello"];
    },
    products: () => {
      return products;
    },
    product: (parent, args, context) => {
      const { id } = args;
      const product = products.find((product) => product.id === id);
      if (!product) return null;
      return product;
    },

    categories: () => {
      return categories;
    },
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
  Category: {
    products: parent,
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log("Server is ready at " + url);
});
