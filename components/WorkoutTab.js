"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import ExerciseCard from "@/components/ExerciseCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/DateFormat";
import { Separator } from "@/components/ui/separator";
import GraphCard from "@/components/GraphCard";
import GraphPicker from "@/components/GraphPicker";
import { getExercises, getExerciseData } from "@/lib/firestore/GetExercises";
import WorkoutCard from "@/components/WorkoutCard";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

import {
    getMostRecentWorkout,
    getWorkoutByDate,
    getAllWorkouts,
} from "@/lib/firestore/GetWorkouts";

export default function WorkoutTab() {
    const router = useRouter();
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [workout, setWorkout] = React.useState([]);
    const [graphValue, setGraphValue] = React.useState("");
    const [exerciseNames, setExerciseNames] = React.useState([]);
    const [exerciseData, setExerciseData] = React.useState({});
    const [workoutDates, setWorkoutDates] = React.useState([]);

    // Get most recent workout from firestore
    const showMostRecentWorkout = async () => {
        const snapshot = await getMostRecentWorkout();

        snapshot.forEach((document) => {
            const data = document.data();
            setCalendarDate(data.Date.toDate());
            console.log(new Date(data.Date.toDate()));
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
        //Get exercise names on page load
        getExercises().then((snapshot) => {
            const newExerciseNames = [];
            snapshot.forEach((doc) => {
                const newExercise = { label: doc.id, value: doc.id };
                newExerciseNames.push(newExercise);
            });
            setExerciseNames(newExerciseNames);
            setGraphValue(newExerciseNames[0]?.value);
            console.log(graphValue);
        });
    }, []);

    React.useEffect(() => {
        if (!graphValue) {
            return;
        }

        getExerciseData(graphValue).then((snapshot) => {
            const data = Object.entries(snapshot.docs[0].data());

            data.sort(([a], [b]) => {
                return new Date(a) - new Date(b);
            });

            setExerciseData(Object.fromEntries(data));
        });
    }, [graphValue]);

    React.useEffect(() => {
        //Get workout dates on page load
        getAllWorkouts().then((snapshot) => {
            const dates = [];
            snapshot.forEach((doc) => {
                const date = doc.data().Date.toDate();

                dates.push(formatDate(date));
            });
            dates.sort(([a], [b]) => {
                return new Date(a) - new Date(b);
            });
            setWorkoutDates(dates);
        });
    });

    const handlePrevWorkout = () => {
        //Go to previous date if it exists, otherwise don't change
        let prevDate;
        if (workoutDates.indexOf(formatDate(calendarDate)) - 1 >= 0) {
            prevDate =
                workoutDates[
                    workoutDates.indexOf(formatDate(calendarDate)) - 1
                ];
        } else {
            return;
        }

        const prevDateWithOffset = new Date(prevDate);
        prevDateWithOffset.setHours(prevDateWithOffset.getHours() + 4);
        setCalendarDate(prevDateWithOffset);
    };

    const handleNextWorkout = () => {
        //Go to next date if it exists, otherwise don't change
        let nextDate;
        if (
            workoutDates.indexOf(formatDate(calendarDate)) + 1 <
            workoutDates.length
        ) {
            nextDate =
                workoutDates[
                    workoutDates.indexOf(formatDate(calendarDate)) + 1
                ];
        } else {
            return;
        }

        const nextDateWithOffset = new Date(nextDate);
        nextDateWithOffset.setHours(nextDateWithOffset.getHours() + 4);
        setCalendarDate(nextDateWithOffset);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3">
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
                <Card className="grow pt-6 relative md:max-h-96 max-h-full">
                    <CardContent className="md:overflow-auto md:max-h-[85%] pb-14 md:pb-0">
                        {workout.length != 0 ? (
                            <>
                                <WorkoutCard
                                    workout={workout}
                                    date={formatDate(calendarDate)}
                                />
                                <Button
                                    variant="outline"
                                    className="absolute md:left-2 md:bottom-2 left-3 bottom-3"
                                    onClick={handlePrevWorkout}
                                >
                                    <MdNavigateBefore />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="absolute md:right-2 md:bottom-2 right-3 bottom-3"
                                    onClick={handleNextWorkout}
                                >
                                    <MdNavigateNext />
                                </Button>
                            </>
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
                    </CardContent>
                </Card>
            </div>
            <div className="pt-3 flex flex-col sm:flex-row-reverse gap-3 sm:justify-end">
                <div className="w-full md:w-1/4">
                    <GraphPicker
                        exerciseNames={exerciseNames}
                        graphValue={graphValue}
                        setGraphValue={setGraphValue}
                    />
                </div>
                <div className="grow">
                    <GraphCard name={graphValue} exerciseData={exerciseData} />
                </div>
            </div>
        </>
    );
}
