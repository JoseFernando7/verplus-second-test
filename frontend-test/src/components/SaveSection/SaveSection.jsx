import React from 'react'
import { useData } from '../../context/DataContext'
import SaveModal from '../../utils/SaveModal'
import SavedQueries from './SavedQueries/SavedQueries'

function SaveSection () {
  const { data } = useData()

  return (
    <>
      <section>
        <h2> Save Area</h2>
        <SaveModal response1={data ? data[0].response : null} response2={data ? data[1].response : null} />
        <SavedQueries />
      </section>
    </>
  )
}

export default SaveSection
