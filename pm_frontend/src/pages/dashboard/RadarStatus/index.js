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
  import { Radar } from 'react-chartjs-2';
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
  

export default function RadarStatus ( { dashboard } ) {
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
              text: 'Estados por empresa'
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
                    backgroundColor: "rgb(44, 168, 255, 0.4)",
                    borderColor: "rgb(44, 168, 255)",
                    data: stateList[0],
                },
                {
                    label: companies[1],
                    backgroundColor: "rgb(255, 178, 54, 0.4)",
                    borderColor: "#ffb236",
                    data: stateList[1],
                },
                {
                    label: companies[2],
                    backgroundColor: "rgb(159,162,167, 0.4)",
                    borderColor: "rgb(159,162,167)",
                    data: stateList[2],
                },
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
            <Radar data={data} options={options}/>
        </Grid>
    )
};
