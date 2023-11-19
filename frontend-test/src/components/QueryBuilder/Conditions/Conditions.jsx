import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { dmaNames } from '../../../utils/dmaNames'
import { comparisonOperators } from '../../../utils/comparisonOperators'

const Conditions = forwardRef((props, ref) => {
  const [isDmaNameChecked, setIsDmaNameChecked] = useState(false)
  const [isDmaIdChecked, setIsDmaIdChecked] = useState(false)
  const [isTermChecked, setIsTermChecked] = useState(false)
  const [isWeekChecked, setIsWeekChecked] = useState(false)
  const [isRankChecked, setIsRankChecked] = useState(false)
  const [isRefreshDateChecked, setIsRefreshDateChecked] = useState(false)

  // Access to info
  const dmaNameSelectRef = useRef()
  const dmaIdSelectRef = useRef()
  const termSelectRef = useRef()
  const weekSelectRef = useRef()
  const rankSelectRef = useRef()
  const refreshDateSelectRef = useRef()

  const handleDmaNameCheckboxChange = () => {
    setIsDmaNameChecked(!isDmaNameChecked)
  }

  const handleDmaIdCheckboxChange = () => {
    setIsDmaIdChecked(!isDmaIdChecked)
  }

  const handleTermCheckboxChange = () => {
    setIsTermChecked(!isTermChecked)
  }

  const handleWeekCheckboxChange = () => {
    setIsWeekChecked(!isWeekChecked)
  }

  const handleRankCheckboxChange = () => {
    setIsRankChecked(!isRankChecked)
  }

  const handleRefreshDateCheckboxChange = () => {
    setIsRefreshDateChecked(!isRefreshDateChecked)
  }

  // Assign refs to extern ref
  useEffect(() => {
    if (ref) {
      ref.current = {
        getValues: () => {
          const values = {}

          if (isDmaNameChecked) {
            values.dma_name = dmaNameSelectRef.current.value
          }

          if (isDmaIdChecked) {
            values.dma_id = {
              operator: dmaIdSelectRef.current.value,
              value: parseInt(dmaIdSelectRef.current.nextSibling.value, 10)
            }
          }

          if (isTermChecked) {
            values.term = {
              operator: termSelectRef.current.value,
              value: termSelectRef.current.nextSibling.value
            }
          }

          if (isWeekChecked) {
            values.week = {
              operator: weekSelectRef.current.value,
              value: weekSelectRef.current.nextSibling.value
            }
          }

          if (isRankChecked) {
            values.rank = {
              operator: rankSelectRef.current.value,
              value: parseInt(rankSelectRef.current.nextSibling.value, 10)
            }
          }

          if (isRefreshDateChecked) {
            values.refresh_date = {
              operator: refreshDateSelectRef.current.value,
              value: refreshDateSelectRef.current.nextSibling.value
            }
          }

          return values
        }
      }
    }
  }, [ref, isDmaNameChecked, isDmaIdChecked, isTermChecked, isWeekChecked, isRankChecked, isRefreshDateChecked])

  return (
    <>
      <section>
        <div>
          <h3> Query Conditions </h3>
          <p> Select, between all the condition options those that fit more on your needs </p>
        </div>

        <span>
          <label>
            <input type='checkbox' checked={isDmaNameChecked} onChange={handleDmaNameCheckboxChange} />
            DMA Name
          </label>
          {isDmaNameChecked && (
            <section>
              <select ref={dmaNameSelectRef}>
                {dmaNames.map((name) => <option key={name}> {name} </option>)}
              </select>
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isDmaIdChecked} onChange={handleDmaIdCheckboxChange} />
            DMA ID
          </label>
          {isDmaIdChecked && (
            <section>
              <select ref={dmaIdSelectRef}>
                {comparisonOperators.map((operator) => <option key={operator.label} value={operator.value}> {operator.label} </option>)}
              </select>
              <input type='number' min='0' />
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isTermChecked} onChange={handleTermCheckboxChange} />
            Term
          </label>
          {isTermChecked && (
            <section>
              <select ref={termSelectRef}>
                {comparisonOperators.map((operator) => <option key={operator.label} value={operator.value}> {operator.label} </option>)}
              </select>
              <input type='text' placeholder='Term to search' />
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isWeekChecked} onChange={handleWeekCheckboxChange} />
            Week
          </label>
          {isWeekChecked && (
            <section>
              <select ref={weekSelectRef}>
                {comparisonOperators.map((operator) => <option key={operator.label} value={operator.value}> {operator.label} </option>)}
              </select>
              <input type='date' />
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isRankChecked} onChange={handleRankCheckboxChange} />
            Rank
          </label>
          {isRankChecked && (
            <section>
              <select ref={rankSelectRef}>
                {comparisonOperators.map((operator) => <option key={operator.label} value={operator.value}> {operator.label} </option>)}
              </select>
              <input type='number' min='0' />
            </section>
          )}
        </span>

        <span>
          <label>
            <input type='checkbox' checked={isRefreshDateChecked} onChange={handleRefreshDateCheckboxChange} />
            Refresh Date
          </label>
          {isRefreshDateChecked && (
            <section>
              <select ref={refreshDateSelectRef}>
                {comparisonOperators.map((operator) => <option key={operator.label} value={operator.value}> {operator.label} </option>)}
              </select>
              <input type='date' />
            </section>
          )}
        </span>
      </section>
    </>
  )
})

Conditions.displayName = 'Conditions'

export default Conditions
