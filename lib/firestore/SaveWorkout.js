const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const {
    getFirestore,
    collection,
    doc,
    setDoc,
    addDoc,
    updateDoc,
} = require("firebase/firestore");
const { getCurrentUser } = require("@/lib/firestore/Users");

export async function saveWorkout(exercises, date) {
    const db = getFirestore(firebaseApp);
    const user = await getCurrentUser();

    if (!user) {
        console.log("no user");
        return;
    }

    //Save data to 'Workout' collection
    let workout = {};
    exercises.forEach((exercise) => {
        if (exercise.cardio) {
            workout[exercise.name] = {
                time: exercise.time,
                calories: exercise.calories,
                key: exercise.key,
                cardio: exercise.cardio,
            };
        } else {
            workout[exercise.name] = {
                reps: exercise.reps,
                sets: exercise.sets,
                weight: exercise.weight,
                key: exercise.key,
                cardio: exercise.cardio,
            };
        }
    });

    //add date object from formatted date
    workout["Date"] = new Date(date);
    workout["Date"].setHours(workout["Date"].getHours() + 4);

    let collectionRef = collection(db, "users", user, "Workouts");
    let documentRef = doc(collectionRef, date);

    await setDoc(documentRef, workout);

    //Save date + reps/weight to 'Exercises' collection for each exercise
    collectionRef = collection(db, "users", user, "Exercises");

    exercises.forEach(async (exercise) => {
        documentRef = doc(collectionRef, exercise.name);

        let data = {};
        if (exercise.cardio) {
            data[date] = { calories: exercise.calories };
        } else {
            if (exercise.weight == 0) {
                //keep track of reps instead
                data[date] = { reps: exercise.reps };
            } else {
                //keep track of weight
                data[date] = { weight: exercise.weight };
            }
        }

        await updateDoc(documentRef, data);
    });
}
