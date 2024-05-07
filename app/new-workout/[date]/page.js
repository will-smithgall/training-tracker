"use client";

import * as React from "react";

import NewWorkoutCard from "@/components/NewWorkoutCard";

export default function NewWorkout({ params }) {
    React.useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            //redirect to login
            window.location.href = "/login";
        }

        console.log("User email: ", email);
    }, []);

    return <NewWorkoutCard date={params.date} />;
}
