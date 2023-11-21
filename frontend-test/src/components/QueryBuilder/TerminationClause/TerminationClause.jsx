import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { columnNames } from '../../../utils/comparisonOperators'

/**
 * Component that renders the termination clause and get the informatio selected by the user.
 * @component
 */
const TerminationClause = forwardRef((props, ref) => {
  const [isLimitChecked, setIsLimitChecked] = useState(false)
  const [isOrderByChecked, setIsOrderByChecked] = useState(false)

  const limitSelectRef = useRef()
  const orderBySelectRef = useRef()

  /**
   * Set the state of the limit input.
   */
  const handleLimitCheckboxChange = () => {
    setIsLimitChecked(!isLimitChecked)
  }

  /**
   * Set the state of the order by input.
   */
  const handleOrderByCheckboxChange = () => {
    setIsOrderByChecked(!isOrderByChecked)
  }

  // Update the ref with the current values of the limit and order by inputs when the component is mounted.
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
