"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import ExerciseCard from "./ExerciseCard";
const { firebaseApp } = require("./FirebaseConfig"); //Starts the firebase app
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
const {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    where,
    getDocs,
    Timestamp,
} = require("firebase/firestore");

export default function WorkoutTab() {
    const db = getFirestore();
    const router = useRouter();
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [workout, setWorkout] = React.useState([]);

    //TODO: add somewhere to put a button to display a form to add a workout (another spot mentioned in todo below)

    function formatDate(date) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

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

    const getWorkoutByDate = async (date) => {
        //Check for workout at any point in the selected date
        const q = query(
            collection(db, "Workouts"),
            where("Date", ">=", Timestamp.fromDate(date)),
            where(
                "Date",
                "<",
                Timestamp.fromDate(
                    new Date(date.getTime() + 24 * 60 * 60 * 1000)
                )
            ),
            limit(1)
        );

        getDocs(q).then((snapshot) => {
            snapshot.forEach((document) => {
                const data = document.data();
                let exercises = [];

                for (const name in data) {
                    const content = data[name];
                    if (name != "Date") {
                        exercises = [...exercises, { name, content }];
                    }
                }

                setWorkout(exercises);
            });

            if (snapshot.docs.length == 0) {
                setWorkout([]);
            }
        });
    };

    React.useEffect(() => {
        if (!calendarDate) {
            return;
        }

        //Update displayed workout when calendar date is changed
        getWorkoutByDate(calendarDate);
    }, [calendarDate]);

    React.useEffect(() => {
        if (!workout) {
            return;
        }

        console.log(workout);
    }, [workout]);

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
                    {workout.length != 0 ? (
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
    );
}
