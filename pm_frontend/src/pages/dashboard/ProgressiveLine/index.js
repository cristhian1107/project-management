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
              text: `Estados por día (${company})`
            },
        },
        animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
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

    dashboard.map(({day, ...data}) => (
        days.push(day),
        aprobado.push(data.aprobado),
        cancelado.push(data.cancelado),
        confirmado.push(data.confirmado),
        culminado.push(data.culminado),
        pausado.push(data.pausado),
        proceso.push(data.proceso),
        rechazado.push(data.rechazado),
        solicitado.push(data.solicitado)
    ));
    let content = [];
    content.push(
        {"color": "#9ee09e", "name": "Aprobado", "state": aprobado},
        {"color": "#feb144", "name": "Cancelado", "state": cancelado},
        {"color": "#bbdcad", "name": "Confirmado", "state": confirmado},
        {"color": "#9ec1cf", "name": "Culminado", "state": culminado},
        {"color": "#f9a586", "name": "Pausado", "state": pausado},
        {"color": "#cc99c9", "name": "En Proceso", "state": proceso},
        {"color": "#ff6663", "name": "Rechazado", "state": rechazado},
        {"color": "#a6c7ea", "name": "Solicitado", "state": solicitado}
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
