"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AiTwotoneCloseCircle } from "react-icons/ai";
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
    handleClick = () => {},
}) {
    return (
        <Card className="p-3 w-full h-full group relative">
            <CardTitle className="pb-3">{name}</CardTitle>
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
                            <TableCell>{weight}</TableCell>
                            <TableCell>{sets}</TableCell>
                            <TableCell>{reps}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                {!hide && (
                    <AiTwotoneCloseCircle
                        className="text-right hidden group-hover:block absolute right-2 top-[45%] cursor-pointer"
                        style={{
                            transition: "all 0.3s",
                        }}
                        size={24}
                        onClick={handleClick}
                    />
                )}
            </CardContent>
        </Card>
    );
}
