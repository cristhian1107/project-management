import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';
ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

export default function Graphic ({ dashboard }) {
  let delayed;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Tipo de solicitudes'
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    },
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 600 + context.datasetIndex * 100;
        }
        return delay;
      }
    }
  };
  const types = ['Cantidad de Solicitudes', 'Cantidad de Requerimientos', 'Cantidad de Proyectos'];
  const name = [];
  const sol = [];
  const req = [];
  const pro = [];

  dashboard.map((obj) => (
    name.push([obj.department_name, obj.company_name]),
    sol.push(obj.number_sol),
    req.push(obj.number_req),
    pro.push(obj.number_pro)
  ));

  const data = {
    datasets: [
      {
        label: types[0],
        backgroundColor: '#f96332',
        data: sol
      },
      {
        label: types[1],
        backgroundColor: '#ffb236',
        data: req
      },
      {
        label: types[2],
        backgroundColor: '#2ca8ff',
        data: pro
      }

    ],
    labels: name
  };
  return (
    <Grid
      item xs={12} sm={12} lg={12} md={12}
      sx={{
        marginTop: '50px',
        background: '#FFF',
        borderRadius: '20px',
        height: '400px'
      }}
    >
      <Bar data={data} options={options} />
    </Grid>
  );
}
