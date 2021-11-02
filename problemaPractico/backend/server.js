// const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')

const querys = require("./src/querys")
const mutations = require("./src/mutations")
const { query } = require('express')

const typeDefs = importSchema('./src/schema.graphql')

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		obtenerUsuario: querys.obtenerUsuario,
		obtenerTodosLosUsuarios: querys.obtenerTodosLosUsuarios,
	},
	Mutation: {
		crearUsuario: mutations.crearUsuario,
		modificarUsuario: mutations.modificarUsuario,
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = require('express')();
server.applyMiddleware({ app });

app.listen({ port: 4502 }, () =>
	console.log(`🚀 Server ready at http://localhost:4502${server.graphqlPath}`)
);