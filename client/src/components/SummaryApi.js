// Creates a new summary through the GraphQL mutation `addSummary`.
// Expects `summaryData` to match the backend input shape.
export async function addSummary(summaryData) {
  try {
    // Send a standard GraphQL POST request to the API endpoint.
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation AddSummary($input: AddSummaryInput!) {
            addSummary(input: $input) {
              summaryID
              originalText
              summary
              keywords
              rating
              wordCount
            }
          }
        `,
        variables: { input: summaryData },
      }),
    });

    // GraphQL responses are wrapped in a `data` object.
    const result = await response.json();
    return result.data.addSummary;
  } catch (error) {
    // Log and rethrow so calling code can still handle the failure.
    console.error('Error adding summary:', error);
    throw error;
  }
}

// Fetches summaries filtered by a single keyword.
// Returns an array from the `getKeyword` query.
export async function getSummariesByKeyword(keyword) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        query: `
          query GetSummariesByKeyword($keyword: String!) {
            getKeyword(keyword: $keyword) {
              summaryID
              originalText
              summary
              keywords
              rating
              wordCount
            }
          }
        `,
        variables: { keyword },
      }),
    });

    const result = await response.json();
    return result.data.getKeyword;
  } catch (error) {
    console.error('Error fetching summaries by keyword:', error);
    throw error;
  }
}

// Updates an existing summary by ID.
// `summaryID` identifies the record, `updatedData` contains new field values.
export async function updateSummary(summaryID, updatedData) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation UpdateSummary($summaryID: ID!, $input: AddSummaryInput!) {
            updateSummary(summaryID: $summaryID, input: $input) {
              summaryID
              originalText
              summary
              keywords
              rating
              wordCount
            }
          }
        `,
        variables: { summaryID, input: updatedData },
      }),
    });

    const result = await response.json();
    return result.data.updateSummary;
  } catch (error) {
    console.error('Error updating summary:', error);
    throw error;
  }
}

// Deletes a summary by ID.
// Returns a boolean (`true` if deletion succeeded).
export async function deleteSummary(summaryID) {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation DeleteSummary($summaryID: ID!) {
            deleteSummary(summaryID: $summaryID)
          }
        `,
        variables: { summaryID },
      }),
    });

    const result = await response.json();
    return result.data.deleteSummary;
  } catch (error) {
    console.error('Error deleting summary:', error);
    throw error;
  }
}