"use client";

import * as React from "react";

import NewWorkoutCard from "@/components/NewWorkoutCard";
import { getCurrentUser } from "@/lib/firestore/Users";

export default function NewWorkout({ params }) {
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

    return foundUser ? <NewWorkoutCard date={params.date} /> : <></>;
}
