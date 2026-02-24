async function addSummary(summaryData) {
  try {
    const response = await fetch('/graphql', {
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

async function getSummariesByKeyword(keyword) {
  try {
    const response = await fetch('/graphql', {
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

async function updateSummary(summaryID, updatedData) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation UpdateSummary($summaryID: ID!, $input: UpdateSummaryInput!) {
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

async function deleteSummary(summaryID) {
  try {
    const response = await fetch('/graphql', {
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