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

UserBarChart.propTypes = {
  /**
   * The info of the other column selected fetched from the server.
   */
  response1: PropTypes.array.isRequired,
  /**
   * The info of the rank column selected fetched from the server.
   */
  response2: PropTypes.array.isRequired
}

/**
 * Component that renders a bar chart with the info of the query saved by the user selected.
 * @param {*} {} - An object with the info of the json object fetched.
 * @returns - JSX.Element with the bar chart.
 */
export default function UserBarChart ({ response1, response2 }) {
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
        label: 'Rank',
        data: response2,
        backgroundColor: 'rgba(0, 220, 195, 0.5)'
      }
    ]
  }
  return (
    <Bar options={options} data={data} />
  )
}
