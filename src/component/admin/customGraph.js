import {CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {tokenAxios} from "../../utils/global/axios-config";

Chart.register( CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend)

export default function CustomGraph({type,date}){

    const [label, setLabel] = useState();
    const [count,setCount] = useState();

    useEffect(() => {

        if(date === undefined)
            return;

        tokenAxios.get(`/admin/${type.eng}?date=${date}`)
            .then(res => {
                const keys = Object.keys(res.data.createCount);
                setLabel(keys);
                let array = [];
                let i = 0;
                for (const key of keys) {
                    array[i++]=res.data.createCount[key];
                }
                setCount(array);
            })

    },[date])



    const data = {
        labels :label,
        datasets: [
            {
                label: `신규 ${type.kor} 수`,
                borderColor: 'rgb(54, 162, 235)',
                data: count,
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