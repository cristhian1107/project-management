import {useMemo} from 'react';
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
    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Radar'
            },
        }
    }
    const states = [
        "Solicitado",
        "Confirmado",
        "Aprobado",
        "En Proceso",
        "Culminado",
        "Rechazado",
        "Cancelado",
        "Pausado"
    ];
    /*
    [
        {
            company: AUTRISA,
            "Solicitado": 5
            "Confirmado": 2
            "Aprobado": 3
            "Definido": 3,
            "En Proceso": 3,
            "Culminado": 7,
            "Rechazado": 3,
            "Cancelado": 5,
            "Pausado": 4
        },
        {
            company: INKAMOTORS,
            "Solicitado": 5
            "Confirmado": 2
            "Aprobado": 3
            "Definido": 3,
            "En Proceso": 3,
            "Culminado": 7,
            "Rechazado": 3,
            "Cancelado": 5,
            "Pausado": 4
        },
        {
            company: NOVAAUTOS,
            "Solicitado": 5
            "Confirmado": 2
            "Aprobado": 3
            "Definido": 3,
            "En Proceso": 3,
            "Culminado": 7,
            "Rechazado": 3,
            "Cancelado": 5,
            "Pausado": 4
        }
    ]
    */
    const companies = [];
    const stateList = [];
 
    dashboard.map(( {company, ...status} ) => (
        companies.push(company),
        stateList.push(status.map((key, value) => value))
    ));
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: companies[0],
                    backgroundColor: "#f96332",
                    data: stateList[0],
                },
                {
                    label: companies[1],
                    backgroundColor: "#ffb236",
                    data: stateList[1],
                },
                {
                    label: companies[2],
                    backgroundColor: "#2ca8ff",
                    data: stateList[2],
                },
                
            ],
            labels: states
        };
    }, []);
    return (
        <Grid item xs={12} sm={12} lg={6} md={6}
            sx={{
                marginTop: "50px",
                background: "#FFF",
                borderRadius: "20px",
            }}
        >
            <Radar data={data} options={options}/>
        </Grid>
    )
};