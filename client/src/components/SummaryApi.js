// Shared GraphQL endpoint for all requests.
const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

// Fetch all summaries.
export async function getAllSummaries() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetAllSummaries {
            getSummaries {
              summaryID
              originalText
              summary
              keywords
              rating
              wordCount
              timestamp
            }
          }
        `,
      }),
    });

    const result = await response.json();
    return result.data.getSummaries;
  } catch (error) {
    console.error('Error fetching all summaries:', error);
    throw error;
  }
}

// Create one summary.
export async function addSummary(summaryData) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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

    const result = await response.json();
    return result.data.addSummary;
  } catch (error) {
    console.error('Error adding summary:', error);
    throw error;
  }
}

// Fetch summaries by keyword.
export async function getSummariesByKeyword(keyword) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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

// Update a summary by ID.
export async function updateSummary(summaryID, updatedData) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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

// Delete a summary by ID.
export async function deleteSummary(summaryID) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
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