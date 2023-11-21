/**
 * Get the users information from the database.
 * @returns - The users information in a object.
 */
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/')

    if (!response.ok) {
      throw new Error('Error getting the users')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error sending the query: ', error.message)
  }
}
