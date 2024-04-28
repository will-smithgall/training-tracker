"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { CiEdit } from "react-icons/ci";

import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export default function ExerciseCard({
    name,
    weight,
    sets,
    reps,
    hide = true,
    editing = false,
    handleClick = () => {},
    handleEdit = () => {},
}) {
    return (
        <Card className="p-3 w-full h-full group relative">
            {editing ? (
                <Input
                    type="string"
                    placeholder={name}
                    className="w-1/2 mx-auto mb-2"
                />
            ) : (
                <CardTitle className="pb-3">{name}</CardTitle>
            )}

            <CardContent>
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
                            {!editing && (
                                <>
                                    <TableCell>{weight}</TableCell>
                                    <TableCell>{sets}</TableCell>
                                    <TableCell>{reps}</TableCell>
                                </>
                            )}
                        </TableRow>
                    </TableBody>
                </Table>
                {editing && (
                    <div className="flex justify-around">
                        <Input
                            type="number"
                            placeholder={weight}
                            className="w-1/4 mt-2"
                        />
                        <Input
                            type="number"
                            placeholder={sets}
                            className="w-1/4 mt-2"
                        />
                        <Input
                            type="number"
                            placeholder={reps}
                            className="w-1/4 mt-2"
                        />
                    </div>
                )}

                {!hide && (
                    <>
                        <AiTwotoneCloseCircle
                            className="text-right hidden group-hover:block absolute right-2 top-[5%] cursor-pointer"
                            style={{
                                transition: "all 0.3s",
                            }}
                            size={24}
                            onClick={handleClick}
                        />
                        <CiEdit
                            className="text-right hidden group-hover:block absolute right-2 top-[20%] cursor-pointer"
                            style={{
                                transition: "all 0.3s",
                            }}
                            size={24}
                            onClick={handleEdit}
                        />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
