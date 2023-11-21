import { Bar } from 'react-chartjs-2'
import PropTypes from 'prop-types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

BarChart.propTypes = {
  /**
   * The information of the other column selected by the user
   */
  response1: PropTypes.array.isRequired,

  /**
   * The information of the column rank.
   */
  response2: PropTypes.array.isRequired
}

/**
 * Component that shows a bar chart with the information that the server returns of the bigquery.
 * @returns - The render of the bar chart.
 */
export default function BarChart ({ response1, response2 }) {
  const options = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 25
      },
      x: {
        ticks: { color: 'rgba(0, 220, 195)' }
      }
    }
  }

  const data = {
    labels: response1,
    datasets: [
      {
        label: 'Beneficios',
        data: response2,
        backgroundColor: 'rgba(0, 220, 195, 0.5)'
      }
    ]
  }
  return (
    <Bar options={options} data={data} />
  )
}
