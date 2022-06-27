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
    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Gráfica'
            },
        }
    }
    const types = ['Cantidad de Solicitudes', 'Cantidad de Requerimientos', 'Cantidad de Proyectos'];
    const company = [];
    const sol = [];
    const req = [];
    const pro = [];
    
    dashboard.map((obj) => (
        company.push(obj.company),
        sol.push(obj.number_sol),
        req.push(obj.number_req),
        pro.push(obj.number_pro)
    ));    
    const data = useMemo(function () {
        return {
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
    }, []);
    return (
        <Grid item xs={12} sm={12} lg={6} md={6}
            sx={{
                marginTop: "50px",
                background: "#FFF",
                borderRadius: "20px",
            }}
        >
            <Bar data={data} options={options}/>
        </Grid>
    )
};

/*
#f96332
#ffb236
#2ca8ff

Filtros -> {
    empresa
    MES 
    AÑO
}
dasboard[1] = [
    {
        company: Autrisa,
        number_sol: 10,
        number_req: 15,
        number_pro: 20,  
        color: "red",
    },
    {
        company: NovaAutos,
        number_sol: 10,
        number_req: 15,
        number_pro: 20,  
        color: "blue",
    },
    {
        company: IncaMotors,
        number_sol: 10,
        number_req: 15,
        number_pro: 20,  
        color: "black",
    },
]
dasboard[1] = [
    {
        Type: Solicitud,
        color: "red",
        info: [
            {
                empresa: AUTRISA
                number_sol: 10,
            },
            {
                empresa: INKA
                number_sol: 10,
            },
            {
                empresa: NOVA
                number_sol: 10,
            }
        ]
    },
    {
        Type: Requerimiento,
        color: "blue",
        info: [
            {
                empresa: AUTRISA
                number_sol: 10,
            },
            {
                empresa: INKA
                number_sol: 10,
            },
            {
                empresa: NOVA
                number_sol: 10,
            }
        ]
    },
    {
        Type: Proyectos,
        color: "black",
        info: [
            {
                empresa: AUTRISA
                number_sol: 10,
            },
            {
                empresa: INKA
                number_sol: 10,
            },
            {
                empresa: NOVA
                number_sol: 10,
            }
        ]
    },
]
*/
