import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../service/getUsers'
import UserBarChart from '../../../utils/UserBarChart'

/**
 * Component to display the queries saved by the users. It fetches the users data from the backend and displays the queries saved by the users.
 * @component
 *
 * @returns - A JSX.Element that renders the saved queries.
 */

export function SavedQueries () {
  // Save the state of the users data fetched from the backend, the other column selected and the default rank column.
  const [userData, setUserData] = useState([])
  const [otherColumn, setOtherColumn] = useState([])
  const [rankColumn, setRankColumn] = useState([])

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await getUsers()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching users: ', error.message)
      }
    }

    fetchUsersData()
  }, [userData])

  /**
   * Handles the show query button click. It sets the other column and rank column state variables.
   * @param {string} response1
   * @param {string} response2
   */
  const handleShowSavedQuery = (response1, response2) => {
    setOtherColumn(response1)
    setRankColumn(response2)
  }

  return (
    <>
      <section>
        <h4>Saved Users</h4>
        {/* If the userData state variable is not empty, map through the userData array and display the user data. */}
        {userData && userData.length > 0
          ? (userData.map((user) => {
              return (
                <div key={user.name}>
                  <h5> Username: {user.name} </h5>
                  <h6> Query Name: {user.queries[0].query_name} </h6>
                  <p> {user.queries[0].comment} </p>
                  <button onClick={() => handleShowSavedQuery(user.queries[0].other_column, user.queries[0].rank_column)}> Show Query </button>
                </div>
              )
            }))
          : (
            <p> Loading users... </p>
            )}

        {(otherColumn && rankColumn) && (
          <div style={{ width: '450px', height: '225px' }}>
            <UserBarChart response1={otherColumn} response2={rankColumn} />
          </div>
        )}
      </section>
    </>
  )
}

export default SavedQueries
