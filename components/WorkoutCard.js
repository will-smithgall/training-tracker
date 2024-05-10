import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export default function WorkoutCard({ workout, date }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Exercises</TableHead>
                    <TableHead className="text-right">{date}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {workout.map((exercise) => (
                    <TableRow key={exercise.key}>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell className="text-right">
                            {exercise.cardio
                                ? `${exercise.calories} cal, ${exercise.time} min`
                                : `${exercise.sets}x${exercise.reps}, ${exercise.weight} lbs`}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
