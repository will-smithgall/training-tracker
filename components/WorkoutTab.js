"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import ExerciseCard from "./ExerciseCard";
const { firebaseApp } = require("./FirebaseConfig");
const {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    where,
    getDocs,
} = require("firebase/firestore");
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function WorkoutTab() {
    const db = getFirestore();
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [workout, setWorkout] = React.useState([]);

    // Get most recent workout from firestore
    const getMostRecentWorkout = async () => {
        const q = query(
            collection(db, "Workouts"),
            orderBy("Date", "desc"),
            limit(1)
        );

        getDocs(q)
            .then((snapshot) => {
                snapshot.forEach((document) => {
                    const data = document.data();
                    setCalendarDate(data.Date.toDate());
                    let exercises = [];

                    for (const name in data) {
                        const content = data[name];
                        if (name != "Date") {
                            exercises = [...exercises, { name, content }];
                        }
                    }

                    setWorkout(exercises);
                });
            })
            .catch((error) => {
                console.log("Error getting most recent workout");
            });
    };

    React.useEffect(() => {
        //Get most recent workout on initial page load
        getMostRecentWorkout();
    }, []);

    return (
        <Card className="p-3">
            <CardHeader>Recent Workouts</CardHeader>
            <CardContent className="flex justify-between gap-16">
                <Calendar
                    mode="single"
                    selected={calendarDate}
                    onSelect={setCalendarDate}
                />
                <div className="flex flex-col gap-2 w-full">
                    {workout != [] &&
                        workout.map((exercise, index) => {
                            return (
                                <ExerciseCard
                                    key={index}
                                    exerciseName={exercise.name}
                                    weight={exercise.content.weight}
                                    reps={exercise.content.reps}
                                    sets={exercise.content.sets}
                                />
                            );
                        })}
                </div>
            </CardContent>
        </Card>
    );
}
