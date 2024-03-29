import React from 'react'
import BarChart from '../../utils/barChart'
import { useData } from '../../context/DataContext'

/**
 * Component that use the data result of the server query taking it from context.
 * @returns - BarChart component that displays the bigquery result.
 */

function ChartSection () {
  const { data } = useData()

  if (!data) return null

  return (
    <>
      <div style={{ width: '450px', height: '225px' }}>
        <BarChart response1={data[0].response} response2={data[1].response} />
      </div>
    </>
  )
}

export default ChartSection
