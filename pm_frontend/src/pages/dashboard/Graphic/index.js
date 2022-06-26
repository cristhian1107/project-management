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
  import { Bar, Line } from 'react-chartjs-2';
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

/*
Filtros -> {
    empresa
    MES 
    AÑO
}
dasboard[1] = [
    {
        bussines: Autrisa,
        number_sol: 10,
        number_req: 15,
        number_pro: 20,  
        color: "red",
    },
    {
        bussines: NovaAutos,
        number_sol: 10,
        number_req: 15,
        number_pro: 20,  
        color: "blue",
    },
    {
        bussines: IncaMotors,
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
    const bussines = [];
    const color = [];
    const sol = [];
    const req = [];
    const pro = [];
 
    dashboard.map((obj) => (
        bussines.push(obj.bussines),
        color.push(obj.color),
        sol.push(obj.number_sol),
        req.push(obj.number_req),
        pro.push(obj.number_pro)
    ));    
    const data = useMemo(function () {
        return {
            datasets: [
                {
                    label: types[0],
                    backgroundColor: color[0],
                    data: sol,
                },
                {
                    label: types[1],
                    backgroundColor: color[1],
                    data: req,
                },
                {
                    label: types[2],
                    backgroundColor: color[2],
                    data: pro,
                },
                
            ],
            labels: bussines
        };
    }, []);
    return <Bar data={data} options={options}/>
};
