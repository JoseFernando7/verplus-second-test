import './App.css'
import ChartSection from './components/ChartSection/ChartSection'
import QueryBuilderService from './components/QueryBuilder/QueryBuilder'
import { DataProvider } from './context/DataContext'

function App () {
  return (
    <>
      <div className='App'>
        <DataProvider>
          <QueryBuilderService />
          <ChartSection />
        </DataProvider>
      </div>
    </>
  )
}

export default App
