import { useState } from "react"
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import React, { useEffect } from 'react'
import { ChartPie } from "../cmps/ChartPie.jsx"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import { useSelector } from 'react-redux'
import { loadToysForStatistics } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service'
import { utilService } from "../services/util.service.js"

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
        const labelsCount = {}
    
        toys.forEach((toy) => {
          toy.labels.forEach((label) => {
            labelsCount[label] = labelsCount[label] || 0
          })
        })
    
        toys.forEach((toy) => {
          if (toy.inStock) {
            toy.labels.forEach((label) => {
              labelsCount[label]++
            })
          }
        })
    
        const totalInStockCount = toys.filter((toy) => toy.inStock).length
        const labels = Object.keys(labelsCount)
        console.log(labels)
        const data = labels.map((label) => {
          const count = labelsCount[label]
          const percentage = (count / totalInStockCount) * 100 || 0 
          return percentage.toFixed(2) 
        })
    
        const backgroundColor = labels.map(() => utilService.getRandomColor())

        const updatedChartData = {
          labels,
          datasets: [
            {
              label: "In Stock by Label",
              data,
              backgroundColor,
              borderColor: "black",
              borderWidth: 2,
            },
          ],
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


