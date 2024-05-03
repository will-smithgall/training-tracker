"use client";

import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addExerciseNameFirestore } from "@/lib/firestore/SetExercises";
import Swal from "sweetalert2";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

//setup form schema
const formSchema = z.object({
    name: z.string().min(1).max(50),
    weight: z.coerce.string().min(0),
    sets: z.coerce.string().min(0),
    reps: z.coerce.string().min(0),
});

export default function ExerciseCard({
    exercise,
    exerciseNames,
    hide = true,
    editing = false,
    handleRemove = () => {},
    handleEdit = () => {},
    handleSave = () => {},
    handleAddName = () => {},
}) {
    const [nameOpen, setNameOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    //define form
    const exerciseForm = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

    function addExerciseName() {
        const newName = { label: inputValue, value: inputValue };
        handleAddName([...exerciseNames, newName]);

        //add name to firestore
        addExerciseNameFirestore(inputValue).then(() => {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: `Added ${inputValue}!`,
                showConfirmButton: false,
                timer: 3000,
            });
        });
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
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Name</FormLabel>
                                            <Popover
                                                open={nameOpen}
                                                onOpenChange={setNameOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full sm:w-1/2 justify-between mx-auto",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? exerciseNames.find(
                                                                      (
                                                                          exerciseName
                                                                      ) =>
                                                                          exerciseName.value ===
                                                                          field.value
                                                                  )?.label
                                                                : "Select name"}
                                                            <IoChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search name..."
                                                            className="h-9 w-full"
                                                            onValueChange={(
                                                                value
                                                            ) => {
                                                                setInputValue(
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                        <CommandEmpty>
                                                            <Button
                                                                onClick={() => {
                                                                    addExerciseName();

                                                                    exerciseForm.setValue(
                                                                        "name",
                                                                        inputValue
                                                                    );
                                                                    setNameOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {`Add "${inputValue}"`}
                                                            </Button>
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandList>
                                                                {exerciseNames.map(
                                                                    (
                                                                        exerciseName
                                                                    ) => (
                                                                        <CommandItem
                                                                            value={
                                                                                exerciseName.label
                                                                            }
                                                                            key={
                                                                                exerciseName.value
                                                                            }
                                                                            onSelect={() => {
                                                                                exerciseForm.setValue(
                                                                                    "name",
                                                                                    exerciseName.value
                                                                                );
                                                                                setNameOpen(
                                                                                    false
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                exerciseName.label
                                                                            }
                                                                            <Check
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    exerciseName.value ===
                                                                                        field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandList>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
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
                            onClick={handleRemove}
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
