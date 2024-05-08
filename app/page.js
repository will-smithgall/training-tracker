"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkoutTab from "@/components/WorkoutTab";
const { getCurrentUser } = require("@/lib/firestore/Users");

export default function Home() {
    const [foundUser, setFoundUser] = React.useState(false);

    const handleRedirect = async () => {
        const user = await getCurrentUser();
        if (!user) {
            window.location.href = "/login";
        }

        setFoundUser(true);
        console.log("Got User: ", user);
    };

    React.useEffect(() => {
        handleRedirect();
    }, []);

    // React.useEffect(() => {
    //     const email = localStorage.getItem("email");
    //     if (!email) {
    //         //redirect to login
    //         window.location.href = "/login";
    //     }

    //     console.log("User email: ", email);
    // }, []);

    return foundUser ? (
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
    ) : (
        <></>
    );
}
