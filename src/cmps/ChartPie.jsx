import React from "react"
import { Pie } from "react-chartjs-2";

export function ChartPie({ chartData }) {
    return (
        <div className="main-layout dashboard-main-container">
            <div className="chart-container">
                <h2 className="chart-txt" style={{ textAlign: "center" }}>Products stock status by labels</h2>
                <Pie
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "In stock \ out of stock"
                            }
                        }
                    }}
                />
            </div>
        </div>

    )
}


