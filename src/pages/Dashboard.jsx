import { useState } from "react"
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import React, { useEffect } from 'react'
import { ChartPie } from "../cmps/ChartPie.jsx"
import { CategoryScale } from "chart.js"
import Chart from "chart.js/auto"
import { useSelector } from 'react-redux'
import { loadToysForStatistics } from '../store/actions/toy.actions.js'
import { toyService } from '../services/toy.service'

Chart.register(CategoryScale)


export function Dashboard() {
  const [chartData, setChartData] = useState(toyService.getDefaultChartData())
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToysForStatistics()
      .then((toys) => {
        setChartData(toyService.updateChartData(toys))
      })
      .catch(() => {
        showErrorMsgRedux('Cannot load toys')
      })
  }, [])


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


