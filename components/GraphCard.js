"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import * as React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    //not entirely sure what the point of this is.
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function GraphCard({ exerciseData, name }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "top",
            },
            title: {
                display: true,
                text: name ? `${name} Progress` : "No Exercises to Graph!",
            },
        },
        scales: {
            x: {
                title: {
                    display: name ? true : false,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: exerciseData ? true : false,
                    text: Object.keys(Object.values(exerciseData)[0] || {})[0],
                },
            },
        },
    };

    const labels = Object.keys(exerciseData);

    const data = {
        labels,
        datasets: [
            {
                label: Object.keys(Object.values(exerciseData)[0] || {})[0],
                data: labels.map((label, index) => ({
                    x: label,
                    y: Object.values(Object.values(exerciseData)[index])[0],
                })),
                borderColor: "#E7DB74",
                pointBackgroundColor: "#E7DB74",
                backgroundColor: "#E7DB74",
            },
        ],
    };

    return (
        <Card className="w-full pt-3">
            <CardContent>
                <Line options={options} data={data} />
            </CardContent>
        </Card>
    );
}
