"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import ExerciseCard from "./ExerciseCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/DateFormat";
import { Separator } from "@/components/ui/separator";

import {
    getMostRecentWorkout,
    getWorkoutByDate,
} from "@/lib/firestore/GetWorkouts";

export default function WorkoutTab() {
    const router = useRouter();
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [workout, setWorkout] = React.useState([]);

    //TODO: add somewhere to put a button to display a form to add a workout (another spot mentioned in todo below)

    // Get most recent workout from firestore
    const showMostRecentWorkout = async () => {
        const snapshot = await getMostRecentWorkout();

        snapshot.forEach((document) => {
            const data = document.data();
            setCalendarDate(data.Date.toDate());
        });
    };

    React.useEffect(() => {
        //Get most recent workout on initial page load
        showMostRecentWorkout();
    }, []);

    const updateWorkoutFromDate = async (date) => {
        const snapshot = await getWorkoutByDate(date);

        snapshot.forEach((document) => {
            const data = document.data();
            let exercises = [];

            for (const name in data) {
                const content = data[name];
                const cardio = content.cardio;

                if (content.cardio) {
                    const time = content.time;
                    const calories = content.calories;
                    const key = content.key;

                    if (name != "Date") {
                        exercises = [
                            ...exercises,
                            { name, cardio, time, calories, key },
                        ];
                    }
                } else {
                    const reps = content.reps;
                    const sets = content.sets;
                    const weight = content.weight;
                    const key = content.key;

                    if (name != "Date") {
                        exercises = [
                            ...exercises,
                            { name, cardio, reps, sets, weight, key },
                        ];
                    }
                }
            }

            setWorkout(exercises);
        });

        if (snapshot.docs.length == 0) {
            setWorkout([]);
        }
    };

    React.useEffect(() => {
        if (!calendarDate) {
            return;
        }

        //Update displayed workout when calendar date is changed
        updateWorkoutFromDate(calendarDate);
    }, [calendarDate]);

    React.useEffect(() => {
        if (!workout) {
            return;
        }
    }, [workout]);

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-3">
                <Card className="h-fit grid justify-items-center">
                    <CardContent>
                        <Calendar
                            mode="single"
                            selected={calendarDate}
                            onSelect={setCalendarDate}
                        />
                        <Separator />
                        <div className="flex justify-center">
                            <Button
                                className="mt-3"
                                onClick={() => {
                                    router.push(
                                        `new-workout/${formatDate(
                                            calendarDate
                                        )}`
                                    );
                                }}
                            >
                                Edit Workout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="grow pt-6">
                    <CardContent>
                        <div className="flex sm:flex-row flex-col gap-2 flex-wrap">
                            {workout.length != 0 ? (
                                workout.map((exercise) => {
                                    return (
                                        <ExerciseCard
                                            key={exercise.key}
                                            exercise={exercise}
                                        />
                                    );
                                })
                            ) : (
                                <>
                                    <p>No workout found for this day</p>
                                    <Button
                                        onClick={() =>
                                            router.push(
                                                `new-workout/${formatDate(
                                                    calendarDate
                                                )}`
                                            )
                                        }
                                    >
                                        Log New Workout
                                    </Button>
                                </> //TODO: Make this not ass lmfao
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
