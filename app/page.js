import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutTab from "@/components/WorkoutTab";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
            <Tabs defaultValue="workout" className="w-full min-w-[320px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="workout">Workout</TabsTrigger>
                    <TabsTrigger value="climbing">Climbing</TabsTrigger>
                </TabsList>

                <TabsContent value="workout">
                    <WorkoutTab />
                </TabsContent>
                <TabsContent value="climbing"></TabsContent>
            </Tabs>
        </main>
    );
}
