import React, { forwardRef, useEffect, useState } from 'react'

/**
 * Component that renders all the column options using the forwardRef function, with rank selected by default
 * @component
 */
const ColumnSelection = forwardRef((props, ref) => {
  const [selectedColumns, setSelectedColumns] = useState({
    dma_name: false,
    dma_id: false,
    term: false,
    week: false,
    rank: true,
    refresh_date: false
  })

  /**
   * Use the column name to toggle the state of the column
   * @param {string} columnName - The name of the column to toggle in the state object
   */
  const handleColumnSelection = (columnName) => {
    setSelectedColumns((prevSelectedColumns) => {
      const newSelectedColumns = { ...prevSelectedColumns }

      // Keep 'rank' selected by default
      newSelectedColumns.rank = true

      // Deselect the other columns
      Object.keys(newSelectedColumns).forEach((key) => {
        if (key !== columnName && key !== 'rank') {
          newSelectedColumns[key] = false
        }
      })

      // Invert the state of the actual column
      newSelectedColumns[columnName] = !prevSelectedColumns[columnName]

      return newSelectedColumns
    })
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
            <input
              type='checkbox' name={columnName} id={columnName}
              checked={selectedColumns[columnName]}
              disabled={columnName === 'rank'} onChange={() => handleColumnSelection(columnName)}
            />
            <label htmlFor={columnName}> {columnName.replace('_', ' ')} </label>
          </span>
        ))}
      </section>
    </>
  )
})

ColumnSelection.displayName = 'ColumnSelection'

export default ColumnSelection
