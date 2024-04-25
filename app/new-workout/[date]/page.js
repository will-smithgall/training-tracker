"use client";

import * as React from "react";
const { firebaseApp } = require("@/components/FirebaseConfig");

export default function NewWorkout({ params }) {
    const date = params.date;

    //TODO: Write data to firestore document {date} with all excercise data as "map" type

    //TODO: Should add new excercise one by one (new card)

    //TODO: Once that excercise card is filled out, that data gets appended to firestore document

    return <div>Date: {date}</div>; //TODO: Set up form/table or something to place all data in (for each excercise)
}
