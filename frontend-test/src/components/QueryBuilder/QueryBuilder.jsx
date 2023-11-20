import React, { useRef } from 'react'
import ColumnSelection from './ColumnSelection/ColumnSelection'
import Conditions from './Conditions/Conditions'
import TerminationClause from './TerminationClause/TerminationClause'
import { sendQuery } from '../../service/postQuery'
import { useData } from '../../context/DataContext'

function QueryBuilder () {
  const { setAppData } = useData()

  const columnSelectionRef = useRef()
  const conditionRef = useRef()
  const terminationClauseRef = useRef()

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

    const whereClause = conditionValues.length > 0 ? `WHERE ${conditionValues.join(' AND ')}` : ''

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
      <ColumnSelection ref={columnSelectionRef} />
      <Conditions ref={conditionRef} />
      <TerminationClause ref={terminationClauseRef} />

      <button onClick={handleBuildQuery}> Build Query </button>
    </>
  )
}

export default QueryBuilder
