const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const connectDB = require("./database/connect");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}

startServer();
