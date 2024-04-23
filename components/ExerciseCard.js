"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export default function ExerciseCard({ exerciseName, weight, sets, reps }) {
    return (
        <Card className="p-3 w-full h-full">
            <CardTitle className="pb-3">{exerciseName}</CardTitle>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="flex justify-between w-full">
                            <TableHead>Weight</TableHead>
                            <TableHead>Sets</TableHead>
                            <TableHead>Reps</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="flex justify-between w-full">
                            <TableCell>{weight}</TableCell>
                            <TableCell>{sets}</TableCell>
                            <TableCell>{reps}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
