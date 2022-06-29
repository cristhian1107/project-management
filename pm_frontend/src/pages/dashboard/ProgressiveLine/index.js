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
  

export default function ProgressiveLine ( { dashboard } ) {
    let delayed;
    const options = {
        responsive: true,
        interaction: {
            intersect: false
        },
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Estados por empresa'
            },
        },
        scales: {
            x: {
              type: 'linear'
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
            },
        }
    }
    const states = [
        "Aprobado",
        "Cancelado",
        "Confirmado",
        "Culminado",
        "Pausado",
        "En Proceso",
        "Rechazado",
        "Solicitado"
    ];
    
    
    const companies = [];
    const stateList = [];
 
    dashboard.map(({ company_name, ...status }) => (
        companies.push(company_name),
        stateList.push(Object.values(status))
        ));
    const data = {
            datasets: [
                {
                    label: companies[0],
                    borderColor: "rgb(44, 168, 255)",
                    data: [1,2],
                    borderWidth: 1,
                    radius: 0,
                }
            ],
            labels: states
    };

    return (
        <Grid item xs={12} sm={12} lg={5.9} md={5.9}
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