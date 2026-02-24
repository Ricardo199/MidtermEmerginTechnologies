import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { gql } from 'graphql-tag';

// Apollo/Express server port
const PORT = 4000;

// GraphQL schema definition:
// - TextSummary is the main data model
// - Query exposes read operations
// - Mutation exposes write operations
const typeDefs = gql`
type TextSummary{
    summaryID: ID! #(unique identifier for each summary)
    originalText: String! #(the original input text)
    summary: String! #(the AI-generated summarized text)
    timestamp: String! #(date and time when the summary was created)
    keywords: [String]! #(an array of extracted keywords)
    rating: Float! #(a rating score for the summary, between 1.0 and 5.0)
    wordCount: Int! #(word count of the original text)
}

type Query {
    getSummaries: [TextSummary]! #(returns a list of all text summaries)
    getsummaryID(summaryID: ID!): TextSummary #(accepts a summaryID and returns the corresponding summary details)
    getOriginalText(originalText: String!): [TextSummary] #(accepts original text and returns summaries that match or closely relate to that text)
    getTimestamp(timestamp: String!): [TextSummary] #(accepts a timestamp and returns summaries created at that time)
    getKeyword(keyword: String!): [TextSummary] #(accepts a keyword and returns summaries that include that keyword)
    getRatingRange(minRating: Float!, maxRating: Float!): [TextSummary] #(accepts a minimum and maximum rating and returns summaries that fall within that range)
}
    
input AddSummaryInput {
    summaryID: ID! #(unique identifier for the summary)
    originalText: String! #(the original input text to be summarized)
    summary: String! #(the AI-generated summarized text)
    keywords: [String]! #(an array of extracted keywords from the original text)
    rating: Float! #(a rating score for the summary, between 1.0 and 5.0)
    wordCount: Int! #(word count of the original text)
}
    
type Mutation {
    addSummary(input: AddSummaryInput!): TextSummary #(accepts an input object containing summary details and adds it to the database, returning the created summary)
    updateSummary(summaryID: ID, input: AddSummaryInput!): TextSummary #(accepts a summaryID and an input object to update the corresponding summary, returning the updated summary)
    deleteSummary(summaryID: ID!): Boolean #(accepts a summaryID and deletes the corresponding summary from the database, returning true if successful)
}`;

// In-memory storage for summaries.
// Note: this resets whenever the server restarts.
let summaries = [];

// Resolver map connects each GraphQL operation in the schema
// to the JavaScript function that returns the result.
const resolvers = {
  Query: {
    // Return every stored summary
    getSummaries: () => summaries,

    // Find a single summary by its ID
    getsummaryID: (_, { summaryID }) => summaries.find(s => s.summaryID === summaryID),

    // Return summaries whose original text contains the input substring
    getOriginalText: (_, { originalText }) => summaries.filter(s => s.originalText.includes(originalText)),

    // Return summaries that exactly match the provided timestamp
    getTimestamp: (_, { timestamp }) => summaries.filter(s => s.timestamp === timestamp),

    // Return summaries containing the given keyword
    getKeyword: (_, { keyword }) => summaries.filter(s => s.keywords.includes(keyword)),

    // Return summaries with rating inside the min/max range (inclusive)
    getRatingRange: (_, { minRating, maxRating }) => summaries.filter(s => s.rating >= minRating && s.rating <= maxRating)
  },    

  Mutation: {
    // Create and store a new summary
    // Timestamp is generated on the server at creation time.
    addSummary: (_, { input }) => {
      const newSummary = { ...input, timestamp: new Date().toISOString() };
      summaries.push(newSummary);
      return newSummary;
    },

    // Update an existing summary by ID.
    // Returns null if the summary does not exist.
    updateSummary: (_, { summaryID, input }) => {
      const index = summaries.findIndex(s => s.summaryID === summaryID);
      if (index === -1) return null;
      summaries[index] = { ...input, summaryID, timestamp: new Date().toISOString() };
      return summaries[index];
    },

    // Delete a summary by ID.
    // Returns false if the summary is not found.
    deleteSummary: (_, { summaryID }) => {
      const index = summaries.findIndex(s => s.summaryID === summaryID);
      if (index === -1) return false;
      summaries.splice(index, 1);
      return true;
    }
  }
};

const app = express();

// Bootstraps Apollo and attaches it to Express at /graphql.
const start = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  // Middleware order matters:
  // 1) CORS, 2) JSON parser, 3) Apollo GraphQL handler
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  // Simple health/info endpoint
  app.get('/', (_, res) => {
    res.send('Apollo GraphQL server is running on /graphql');
  });

  // Start listening for HTTP requests
  app.listen(PORT, () => {
    console.log(`Apollo Server running at http://localhost:${PORT}/graphql`);
  });
};

// Start the server process
start();