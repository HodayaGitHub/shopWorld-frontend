import React from "react"
import { Pie } from "react-chartjs-2";

export function ChartPie({ chartData }) {
    return (
        <div className="chart-container">
            <h2 className="chart-txt" style={{ textAlign: "center" }}>Pie Chart</h2>
            <Pie
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Toys stock status"
                        }
                    }
                }}
            />
        </div>
    )
}
    

