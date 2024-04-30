"use client";

import * as React from "react";
import { DayPicker } from "@/components/ui/DayPicker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExerciseCard from "@/components/ExerciseCard";
import { getWorkoutByDate } from "@/lib/firestore/GetWorkouts";
import { saveWorkout } from "@/lib/firestore/SaveWorkout";
import formatDate from "@/lib/DateFormat";
import { useRouter } from "next/navigation";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import Swal from "sweetalert2";

import {
    Table,
    TableBody,
    TableHeader,
    TableFooter,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export default function NewWorkoutCard({ date }) {
    const [exercises, setExercises] = React.useState([]);
    const [internalDate, setInternalDate] = React.useState(new Date(date));
    const router = useRouter();

    function loadExercises() {
        getWorkoutByDate(date).then((snapshot) => {
            if (snapshot.empty) {
                setExercises([]);
                return;
            }

            const workout = snapshot.docs[0].data();
            let values = [];
            for (const name in workout) {
                const content = workout[name];
                if (name != "Date") {
                    const reps = content.reps;
                    const sets = content.sets;
                    const weight = content.weight;
                    const key = content.key;

                    values = [...values, { name, reps, sets, weight, key }];
                }
            }

            for (const x in values) {
                console.log(values[x]);
            }

            setExercises(values);
        });
    }

    function handleAddExercise() {
        const newExercise = {
            name: "Name",
            weight: 25,
            reps: 3,
            sets: 10,
            key: Math.random(),
        };

        const newExercises = [...exercises, newExercise];
        setExercises(newExercises);
    }

    function handleRemoveExercise(index) {
        const newExercises = exercises.filter((exercise) => {
            return exercise.key !== index;
        });

        setExercises(newExercises);
    }

    function handleEditExercise(index) {
        const newExercises = exercises.map((exercise) => {
            if (exercise.key === index) {
                return {
                    ...exercise,
                    editing: true,
                };
            }
            return exercise;
        });

        setExercises(newExercises);
    }

    function handleSaveExercise(key) {
        const newExercises = exercises.map((exercise) => {
            if (exercise.key === key) {
                return {
                    ...exercise,
                    editing: false,
                };
            }
            return exercise;
        });

        setExercises(newExercises);
    }

    async function handleSaveWorkout() {
        if (exercises.length === 0) {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Empty workout!",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }

        await saveWorkout(exercises, formatDate(internalDate));
        console.log("HEROIAJ:FDKL");
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Workout saved!",
            showConfirmButton: false,
            timer: 3000,
        });
    }

    React.useEffect(() => {
        //load exercises on page load, in case there are some exercises in workout already
        loadExercises();
    }, []);

    React.useEffect(() => {
        if (!internalDate) {
            return;
        }

        //Redirect to new-workout page with new date
        router.push(formatDate(internalDate));
    }, [internalDate]);

    return (
        <Card className="p-3 m-5">
            <CardHeader>
                <div className="flex flex-col gap-3 justify-center items-center">
                    <div className="flex items-center gap-14">
                        <Link href="/">
                            <IoHome size={24} />
                        </Link>
                        <h2>Log New Workout</h2>
                    </div>

                    <DayPicker
                        date={internalDate}
                        setDate={setInternalDate}
                    ></DayPicker>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5 text-center items-center">
                    {exercises.length !== 0 ? (
                        exercises.map((exercise) => {
                            return (
                                <div
                                    className="sm:w-1/2 w-full"
                                    key={exercise.key}
                                >
                                    <ExerciseCard
                                        exercise={exercise}
                                        hide={false}
                                        editing={exercise.editing}
                                        handleClick={() =>
                                            handleRemoveExercise(exercise.key)
                                        }
                                        handleEdit={() =>
                                            handleEditExercise(exercise.key)
                                        }
                                        handleSave={() =>
                                            handleSaveExercise(exercise.key)
                                        }
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </div>
                <div className="flex justify-center gap-16 pt-10">
                    <Button onClick={handleAddExercise}>Add Exercise</Button>
                    <Button onClick={handleSaveWorkout}>Save Workout</Button>
                </div>
            </CardContent>
        </Card>
    );
}
