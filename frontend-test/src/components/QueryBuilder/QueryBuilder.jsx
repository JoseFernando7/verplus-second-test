import React, { useRef } from 'react'
import ColumnSelection from './ColumnSelection/ColumnSelection'
import Conditions from './Conditions/Conditions'
import TerminationClause from './TerminationClause/TerminationClause'
import { sendQuery } from '../../service/postQuery'
import { useData } from '../../context/DataContext'

/**
 * Component that builds the query and sends it to the context
 * @component
 */
function QueryBuilder () {
  const { setAppData } = useData()

  const columnSelectionRef = useRef()
  const conditionRef = useRef()
  const terminationClauseRef = useRef()

  /**
   * Gets the values from the components and builds the query to send it to the context
   */
  const handleBuildQuery = async () => {
    const columnSelectionValue = columnSelectionRef.current.getValue()
    const conditionResult = conditionRef.current.getValues()
    const terminationClauseResult = terminationClauseRef.current.getValues()

    const conditionValues = Object.entries(conditionResult).map(([columnName, condition]) => {
      if (typeof condition === 'object') {
        // For complex conditions (with operators and values)
        if (typeof condition.value === 'number') {
          return `${columnName} ${condition.operator} ${condition.value}`
        }
        return `${columnName} ${condition.operator} '${condition.value}'`
      } else {
        // For simple conditions (with values only)
        return `${columnName} = '${condition}'`
      }
    })

    // Add WHERE clause if there are conditions
    const whereClause = conditionValues.length > 0 ? `WHERE ${conditionValues.join(' AND ')}` : ''

    // Add ORDER BY clause if there is a termination clause
    const terminationValues = Object.entries(terminationClauseResult).map(([columnName, clause]) => {
      if (columnName === 'orderBy') {
        return `ORDER BY ${clause}`
      } else {
        return `${columnName} ${clause}`
      }
    })

    const terminationClause = terminationValues.length > 0 ? `${terminationValues.join(' ')}` : ''

    const query = `SELECT ${columnSelectionValue} FROM bigquery-public-data.google_trends.top_terms ${whereClause} ${terminationClause}`

    const response = await sendQuery(query, columnSelectionValue)
    setAppData(response)
  }

  return (
    <>
      <h1> Google Trends Rank meter </h1>

      <p>
        This tool allows you to build a query to retrieve data from the Google Trends dataset.
        You can compare the rank of the dataset with any other field you want, and add it a customized condition from the query conditions section you have just to select all the fields you need and select the option that accurates most to your needs. Then you just have to enter the value that you need.
        And finally, you can add a termination clause to order the data limiting or sorting it by the field of your choice. <span style={{ fontWeight: 'bold' }}> Highly recommended to you to add a limit for the query. </span> Have fun!!
      </p>

      <ColumnSelection ref={columnSelectionRef} />
      <Conditions ref={conditionRef} />
      <TerminationClause ref={terminationClauseRef} />

      <button onClick={handleBuildQuery}> Build Query </button>
    </>
  )
}

export default QueryBuilder
