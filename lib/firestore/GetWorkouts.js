const { firebaseApp } = require("@/lib/firestore/FirebaseConfig"); //Starts the firebase app
const {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    where,
    getDocs,
    Timestamp,
} = require("firebase/firestore");
const { getCurrentUser } = require("@/lib/firestore/Users");

// Get most recent workout from firestore
export async function getMostRecentWorkout() {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();

    if (!user) {
        console.log("no user");
        return;
    }

    const q = query(
        collection(db, "users", user, "Workouts"),
        orderBy("Date", "desc"),
        limit(1)
    );

    const snapshot = await getDocs(q);
    return snapshot;
}

export async function getWorkoutByDate(date) {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();

    if (!user) {
        console.log("no user");
        return;
    }

    //Check for workout at any point in the selected date
    const q = query(
        collection(db, "users", user, "Workouts"),
        where("Date", ">=", Timestamp.fromDate(new Date(date))),
        where(
            "Date",
            "<",
            Timestamp.fromDate(
                new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
            )
        ),
        limit(1)
    );

    const snapshot = await getDocs(q);
    return snapshot;
}

export async function getAllWorkouts() {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();

    if (!user) {
        console.log("no user");
        return;
    }

    const q = query(collection(db, "users", user, "Workouts"));

    const snapshot = await getDocs(q);
    return snapshot;
}
