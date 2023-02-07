import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {Line} from "react-chartjs-2";
import {useEffect} from "react";

Chart.register( CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

export default function CustomGraph({type,date}){





    const data = {
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: `신규 ${type.kor} 수`,
                borderColor: 'rgb(54, 162, 235)',
                data: [10, 90, 20, 3, 5 ,9 ,52],
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `기간 별 신규 ${type.kor}`,
            },
        },
    };


    return(
        <>
            <Line data={data} options={options}/>
        </>
    )
}