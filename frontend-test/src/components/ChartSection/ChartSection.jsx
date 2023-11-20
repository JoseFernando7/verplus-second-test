import React from 'react'
import BarChart from '../../utils/barChart'
import { useData } from '../../context/DataContext'

function ChartSection () {
  const { data } = useData()

  if (!data) return null

  return (
    <>
      <div style={{ width: '450px', height: '225px' }}>
        <BarChart response1={data[0].response} response2={data[1].response} />
      </div>
      {/* <div>
        <pre> {JSON.stringify(data[0].response, null, 2)} {JSON.stringify(data[1].response, null, 2)} </pre>
      </div> */}
    </>
  )
}

export default ChartSection
