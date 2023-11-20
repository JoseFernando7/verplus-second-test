import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const DataContext = createContext()

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function DataProvider ({ children }) {
  const [data, setData] = useState(null)

  const setAppData = (newData) => {
    setData(newData)
  }

  return (
    <DataContext.Provider value={{ data, setAppData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext)
}
