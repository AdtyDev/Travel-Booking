import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot from "react-dom/client"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache()
});

// Get the root element
const rootElement = document.getElementById("root");

// Create root and render the app
const root = ReactDOM.createRoot(rootElement);
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
