"use client";

import * as React from "react";
import { DayPicker } from "@/components/ui/DayPicker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExerciseCard from "@/components/ExerciseCard";

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

    return (
        <Card className="p-3 m-5">
            <CardHeader>
                <div className="flex flex-col gap-3 justify-center items-center">
                    <h2>Log New Workout</h2>
                    <DayPicker defaultDate={date}></DayPicker>
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
                                        name={exercise.name}
                                        weight={exercise.weight}
                                        sets={exercise.sets}
                                        reps={exercise.reps}
                                        hide={false}
                                        handleClick={() =>
                                            handleRemoveExercise(exercise.key)
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
                    <Button>Save Workout</Button>
                </div>
            </CardContent>
        </Card>
    );
}
