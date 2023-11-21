import './App.css'
import ChartSection from './components/ChartSection/ChartSection'
import QueryBuilderService from './components/QueryBuilder/QueryBuilder'
import SaveSection from './components/SaveSection/SaveSection'
import { DataProvider } from './context/DataContext'
import 'bootstrap/dist/css/bootstrap.min.css'

function App () {
  return (
    <>
      <div className='App'>
        <DataProvider>
          <QueryBuilderService />
          <ChartSection />
          <SaveSection />
        </DataProvider>
      </div>
    </>
  )
}

export default App
