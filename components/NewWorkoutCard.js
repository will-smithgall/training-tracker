"use client";

import { DayPicker } from "./ui/DayPicker";
import { Card, CardContent, CardHeader } from "./ui/card";

export default function NewWorkoutCard({ date }) {
    return (
        <Card className="p-3">
            <CardHeader className="flex flex-col gap-2 justify-around items-center">
                <h2>Log New Workout</h2>
                <DayPicker defaultDate={date}></DayPicker>
            </CardHeader>
            <CardContent>
                <p>
                    TODO: Set up form/table or something to place all data in
                    (for each excercise)
                </p>
            </CardContent>
        </Card>
    );
}
