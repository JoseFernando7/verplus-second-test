async function getDMA() {
  // const username = 'user'
  // const password = '34fd9558-7fe0-48b2-865b-378ab442bd06'

  // const base64Credentials = btoa(`${username}:${password}`)

  // const requestOptions = {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Basic ${base64Credentials}`,
  //     'Content-Type': 'application/json'
  //   },
  //   credentials: 'include'
  // }

  // fetch('http://localhost:8080/dmas')
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Error fetching DMA')
  //   }
    
  //   return response.json()
  // })
  // .catch(error => {
  //   console.error('Error: ', error)
  // })

  try {
    const response = await fetch('http://localhost:8080/dmas')

    if (!response.ok) {
      throw new Error('Error fetching DMA')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error: ', error)
    throw error
  }
}

const dataPromise = getDMA()

export default dataPromise
