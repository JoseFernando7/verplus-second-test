import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { columnNames } from '../../../utils/comparisonOperators'

const TerminationClause = forwardRef((props, ref) => {
  const [isLimitChecked, setIsLimitChecked] = useState(false)
  const [isOrderByChecked, setIsOrderByChecked] = useState(false)

  const limitSelectRef = useRef()
  const orderBySelectRef = useRef()

  const handleLimitCheckboxChange = () => {
    setIsLimitChecked(!isLimitChecked)
  }

  const handleOrderByCheckboxChange = () => {
    setIsOrderByChecked(!isOrderByChecked)
  }

  useEffect(() => {
    if (ref) {
      ref.current = {
        getValues: () => {
          const values = {}

          if (isLimitChecked) {
            values.LIMIT = parseInt(limitSelectRef.current.value, 10)
          }

          if (isOrderByChecked) {
            values.orderBy = orderBySelectRef.current.value
          }

          return values
        }
      }
    }
  }, [ref, isLimitChecked, isOrderByChecked])

  return (
    <>
      <section>
        <div>
          <h3> Termination Clause </h3>
          <p> Finally, add a termination clause to your query. Only if you want to 😉 </p>
        </div>

        <span>
          <label>
            <input type='checkbox' checked={isLimitChecked} onChange={handleLimitCheckboxChange} />
            Limit
          </label>
          {isLimitChecked && (
            <section>
              <input type='number' min='0' ref={limitSelectRef} />
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isOrderByChecked} onChange={handleOrderByCheckboxChange} />
            Order by
          </label>
          {isOrderByChecked && (
            <section>
              <select ref={orderBySelectRef}>
                {columnNames.map((column) => <option key={column.label} value={column.value}> {column.label} </option>)}
              </select>
            </section>
          )}
        </span>
      </section>
    </>
  )
})

TerminationClause.displayName = 'TerminationClause'

export default TerminationClause
