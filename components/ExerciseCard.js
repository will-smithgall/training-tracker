"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

//setup form schema
const formSchema = z.object({
    name: z.string().min(1).max(50),
    weight: z.coerce.string().min(0),
    sets: z.coerce.string().min(0),
    reps: z.coerce.string().min(0),
});

export default function ExerciseCard({
    exercise,
    hide = true,
    editing = false,
    handleClick = () => {},
    handleEdit = () => {},
    handleSave = () => {},
}) {
    //define form
    const exerciseForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: exercise.name,
            weight: exercise.weight,
            sets: exercise.sets,
            reps: exercise.reps,
        },
    });

    function onSubmit(data) {
        exercise.name = data.name;
        exercise.weight = data.weight;
        exercise.sets = data.sets;
        exercise.reps = data.reps;

        handleSave();
    }

    return (
        <Card className="p-2 group relative flex-grow">
            {!editing && (
                <CardTitle className="pt-3 pb-5 text-center">
                    {exercise.name}
                </CardTitle>
            )}

            <CardContent>
                {editing ? (
                    <Form {...exerciseForm}>
                        <form onSubmit={exerciseForm.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-2">
                                <FormField
                                    control={exerciseForm.control}
                                    className="w-1/4 mt-2"
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={exercise.name}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <FormField
                                        control={exerciseForm.control}
                                        className="w-1/4 mt-2"
                                        name="weight"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Weight</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={
                                                            exercise.weight
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={exerciseForm.control}
                                        className="w-1/4 mt-2"
                                        name="sets"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sets</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={
                                                            exercise.sets
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={exerciseForm.control}
                                        className="w-1/4 mt-2"
                                        name="reps"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reps</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={
                                                            exercise.reps
                                                        }
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <button type="submit">
                                <IoCheckmarkDoneOutline
                                    type="submit"
                                    className="text-right hidden group-hover:block absolute right-2 top-8 cursor-pointer"
                                    style={{
                                        transition: "all 0.3s",
                                    }}
                                    size={24}
                                />
                            </button>
                        </form>
                    </Form>
                ) : (
                    //TODO: Update the appearance of the card - make it look not shit
                    <Table>
                        <TableHeader>
                            <TableRow className="flex justify-around justify-items-center w-full">
                                <TableHead>Weight</TableHead>
                                <TableHead>Sets</TableHead>
                                <TableHead>Reps</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="flex justify-around justify-items-center w-full">
                                <>
                                    <TableCell>{exercise.weight}</TableCell>
                                    <TableCell>{exercise.sets}</TableCell>
                                    <TableCell>{exercise.reps}</TableCell>
                                </>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}

                {!hide && (
                    <>
                        <AiTwotoneCloseCircle
                            className="text-right hidden group-hover:block absolute right-2 top-2 cursor-pointer"
                            style={{
                                transition: "all 0.3s",
                            }}
                            size={24}
                            onClick={handleClick}
                        />
                        {!editing && (
                            <CiEdit
                                className="text-right hidden group-hover:block absolute right-2 top-8 cursor-pointer"
                                style={{
                                    transition: "all 0.3s",
                                }}
                                size={24}
                                onClick={handleEdit}
                            />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}
