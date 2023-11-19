import React, { forwardRef, useEffect, useState } from 'react'

const ColumnSelection = forwardRef((props, ref) => {
  const [selectedColumns, setSelectedColumns] = useState({
    dma_name: false,
    dma_id: false,
    term: false,
    week: false,
    rank: false,
    refresh_date: false
  })

  const handleColumnSelection = (columnName) => {
    setSelectedColumns((prevSelectedColumns) => ({
      ...prevSelectedColumns,
      [columnName]: !prevSelectedColumns[columnName]
    }))
  }

  // Assign the state to ref when the state changes
  useEffect(() => {
    if (ref) {
      ref.current = {
        getValue: () => {
          return Object.keys(selectedColumns).filter((columnName) => selectedColumns[columnName])
        }
      }
    }
  }, [selectedColumns, ref])

  return (
    <>
      <section>
        <div>
          <h3> Column Selection </h3>
          <p> Select which columns to display in the graphics. </p>
        </div>

        {Object.keys(selectedColumns).map((columnName) => (
          <span key={columnName}>
            <input type='checkbox' name={columnName} id={columnName} checked={selectedColumns[columnName]} onChange={() => handleColumnSelection(columnName)} />
            <label htmlFor={columnName}> {columnName.replace('_', ' ')} </label>
          </span>
        ))}
      </section>
    </>
  )
})

ColumnSelection.displayName = 'ColumnSelection'

export default ColumnSelection
