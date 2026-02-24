import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { gql } from 'graphql-tag';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import TextSummary from './models/TextSummary.js';

dotenv.config();

// Server port.
const PORT = 4000;

// GraphQL schema definition.
const typeDefs = gql`
type TextSummary{
    summaryID: ID!
    originalText: String!
    summary: String!
    timestamp: String!
    keywords: [String]!
    rating: Float!
    wordCount: Int!
}

type Query {
    getSummaries: [TextSummary]!
  getsummaryID(summaryID: ID!): TextSummary
    getOriginalText(originalText: String!): [TextSummary]
    getTimestamp(timestamp: String!): [TextSummary]
    getKeyword(keyword: String!): [TextSummary]
    getRatingRange(minRating: Float!, maxRating: Float!): [TextSummary]
}
    
input AddSummaryInput {
    summaryID: ID!
    originalText: String!
    summary: String!
    keywords: [String]!
    rating: Float!
    wordCount: Int!
}
    
type Mutation {
    addSummary(input: AddSummaryInput!): TextSummary
    updateSummary(summaryID: ID, input: AddSummaryInput!): TextSummary
    deleteSummary(summaryID: ID!): Boolean
}`;

// Resolver implementations.
const resolvers = {
  Query: {
    getSummaries: async () => TextSummary.find().sort({ timestamp: -1 }),

    getsummaryID: async (_, { summaryID }) => TextSummary.findOne({ summaryID }),

    getOriginalText: async (_, { originalText }) =>
      TextSummary.find({ originalText: { $regex: originalText, $options: 'i' } }),

    getTimestamp: async (_, { timestamp }) => TextSummary.find({ timestamp }),

    getKeyword: async (_, { keyword }) => TextSummary.find({ keywords: keyword }),

    getRatingRange: async (_, { minRating, maxRating }) =>
      TextSummary.find({ rating: { $gte: minRating, $lte: maxRating } })
  },    

  Mutation: {
    addSummary: async (_, { input }) => {
      const createdSummary = await TextSummary.create({
        ...input,
        timestamp: new Date().toISOString()
      });

      return createdSummary;
    },

    updateSummary: async (_, { summaryID, input }) => {
      const updatedSummary = await TextSummary.findOneAndUpdate(
        { summaryID },
        {
          ...input,
          summaryID,
          timestamp: new Date().toISOString()
        },
        { new: true }
      );

      return updatedSummary;
    },

    deleteSummary: async (_, { summaryID }) => {
      const deletionResult = await TextSummary.deleteOne({ summaryID });
      return deletionResult.deletedCount > 0;
    }
  }
};

const app = express();

// Bootstrap server and middleware.
const start = async () => {
  await connectToDatabase();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // GraphQL endpoint middleware.
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  // Basic health/info route.
  app.get('/', (_, res) => {
    res.send('Apollo GraphQL server is running on /graphql');
  });

  // Start HTTP listener.
  app.listen(PORT, () => {
    console.log(`Apollo Server running at http://localhost:${PORT}/graphql`);
  });
};

// Start application.
start();