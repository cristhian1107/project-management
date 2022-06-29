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
  import { Line } from 'react-chartjs-2';
  import Grid from "@mui/material/Grid";
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
  

export default function ProgressiveLine ( { dashboard, company } ) {
    let delayed;
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: "Estados por dia de " + company
            },
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
            },
        }
    }
    const states = [
        "Aprobado",
        "Cancelado",
        "Confirmado",
        "Culminado",
        "Pausado",
        "Proceso",
        "Rechazado",
        "Solicitado"
    ];
    
    const aprobado = [];
    const cancelado = [];
    const confirmado = [];
    const culminado = [];
    const pausado = [];
    const proceso = [];
    const rechazado = [];
    const solicitado = [];
    const days = [];
    dashboard.map((data) => (
        days.push(data.day),
        aprobado.push(data.Aprobado),
        cancelado.push(data.Cancelado),
        confirmado.push(data.Confirmado),
        culminado.push(data.Culminado),
        pausado.push(data.Pausado),
        proceso.push(data.Proceso),
        rechazado.push(data.Rechazado),
        solicitado.push(data.Solicitado)
    ));
    let content = [];
    content.push(
        {"color": "red", "name": "Aprobado", "state": aprobado},
        {"color": "red", "name": "Cancelado", "state": cancelado},
        {"color": "red", "name": "Confirmado", "state": confirmado},
        {"color": "red", "name": "Culminado", "state": culminado},
        {"color": "red", "name": "Pausado", "state": pausado},
        {"color": "red", "name": "En Proceso", "state": proceso},
        {"color": "red", "name": "Rechazado", "state": rechazado},
        {"color": "red", "name": "Solicitado", "state": solicitado}
    )
    const dataset = [];
    content.map(({state, color, name}) => (
        dataset.push({label: name, borderColor: color, data: state})
    ));

    const data = {
            datasets: dataset,
            labels: days,
    };

    return (
        <Grid item xs={12} sm={12} lg={12} md={12}
            sx={{
                marginTop: "50px",
                background: "#FFF",
                borderRadius: "20px",
                height: "400px",
            }}
        >
            <Line data={data} options={options}/>
        </Grid>
    )
};