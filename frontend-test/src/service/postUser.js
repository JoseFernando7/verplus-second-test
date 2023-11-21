export const sendUser = async (formData) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/users/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error(`Error sending the query: ${response.statusText}`)
    }

    const responseData = await response.text()

    return responseData
  } catch (error) {
    console.error('Error sending the query: ', error.message)
  }
}
