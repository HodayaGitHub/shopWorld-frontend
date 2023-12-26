import { useState } from "react"
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import React, { useEffect } from 'react'
import { ChartPie } from "../../src/cmps/Chart"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import { useSelector } from 'react-redux'
import { loadToysForStatistics } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service'

Chart.register(CategoryScale)


export function Dashboard() {
    const [chartData, setChartData] = useState(toyService.getDefaultChartData())

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToysForStatistics()
            .then(() => {
                setChartData(updateChartData())
            })
            .catch(() => {
                showErrorMsgRedux('Cannot load toys')
            })
    }, [])

    function updateChartData() {
        const inStockCount = toys.filter(toy => toy.inStock).length
        const outOfStockCount = toys.filter(toy => !toy.inStock).length

        const updatedChartData = {
            labels: ['In Stock', 'Out of Stock'],
            datasets: [
                {
                    label: "Stock Status",
                    data: [inStockCount, outOfStockCount],
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                    ],
                    borderColor: "black",
                    borderWidth: 2
                }
            ]
        }
        return updatedChartData
    }


    return (
        <React.Fragment>
            {!isLoading &&
                <div className="App">
                    <ChartPie chartData={chartData} />
                </div>
            }
            {isLoading && <div>Loading...</div>}
        </React.Fragment>
    )
}




// console.log('chart toys', toys)
// const inStockCount = toys.filter(toy => toy.inStock).length
// const outOfStockCount = toys.filter(toy => !toy.inStock).length

// console.log('inStockCount', inStockCount)
// console.log('outOfStockCount', outOfStockCount)


// const [chartData, setChartData] = useState({
//     labels: ['In Stock', 'Out of Stock'],

//     datasets: [
//         {
//             label: "Stock Status",
//             data: [inStockCount, outOfStockCount],
//             backgroundColor: [
//                 "rgba(75,192,192,1)",
//                 "#ecf0f1",

//             ],
//             borderColor: "black",
//             borderWidth: 2
//         }
//     ]
// });
