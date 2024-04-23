"use client";

import { DayPicker } from "@/components/ui/DayPicker";
import {
    Card,
    CardContent,
    CardTitle,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

export default function WorkoutCard({ cardTitle }) {
    //keeping this here to remember that one thing

    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>Log a new workout</CardDescription>
            </CardHeader>
            <CardContent>
                <DayPicker />
            </CardContent>
        </Card>
    );
}
