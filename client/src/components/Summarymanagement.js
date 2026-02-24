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