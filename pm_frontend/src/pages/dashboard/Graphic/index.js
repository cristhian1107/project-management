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
  

export default function Graphic ( { dashboard } ) {
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
              text: 'Tipo de solicitudes'
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
    const types = ['Cantidad de Solicitudes', 'Cantidad de Requerimientos', 'Cantidad de Proyectos'];
    const company = [];
    const sol = [];
    const req = [];
    const pro = [];
    
    dashboard.map((obj) => (
        company.push(obj.company_name),
        sol.push(obj.number_sol),
        req.push(obj.number_req),
        pro.push(obj.number_pro)
    ));    

    const data = {
        datasets: [
            {
                label: types[0],
                backgroundColor: "#f96332",
                data: sol,
            },
            {
                label: types[1],
                backgroundColor: "#ffb236",
                data: req,
            },
            {
                label: types[2],
                backgroundColor: "#2ca8ff",
                data: pro,
            },
            
        ],
        labels: company
    };
    return (
        <Grid item xs={12} sm={12} lg={5.9} md={5.9}
            sx={{
                marginTop: "50px",
                marginRight: "10px",
                background: "#FFF",
                borderRadius: "20px",
                height: "400px",
            }}
        >
            <Bar data={data} options={options}/>
        </Grid>
    )
};
