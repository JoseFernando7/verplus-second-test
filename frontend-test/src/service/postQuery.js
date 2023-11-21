/**
 * Send the query that the user built in a POST request.
 * @param {string} query
 * @param {string} fields
 * @returns - The response from the server. The data that the bigquery dataset returns after the server process the query.
 */
export const sendQuery = async (query, fields) => {
  try {
    // const sqlQuery = { query, columns }

    const response = await fetch('http://localhost:8080/dataset-query/add-sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, fields })
    })

    if (!response.ok) {
      throw new Error(`Error sending the query: ${response.statusText}`)
    }

    const responseData = await response.json()

    return responseData
  } catch (error) {
    console.error('Error sending the query: ', error.message)
  }
}
