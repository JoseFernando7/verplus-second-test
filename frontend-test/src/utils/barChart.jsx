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
  response1: PropTypes.array.isRequired,
  response2: PropTypes.array.isRequired
}

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
