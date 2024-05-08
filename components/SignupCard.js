"use client";

import * as React from "react";
import { FaGoogle } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { set } from "date-fns";

const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
    createUserWithEmailAndPassword,
} = require("firebase/auth");
const { addUser } = require("@/lib/firestore/Users");

export default function SignupCard() {
    const [emailInput, setEmailInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [errorText, setErrorText] = React.useState(null);
    const auth = getAuth(firebaseApp);

    const handleSignUpWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then(async (data) => {
            await addUser(data.user.email);
            window.location.href = "/";
        });
    };

    const handleSignUpWithEmailPassword = () => {
        createUserWithEmailAndPassword(auth, emailInput, passwordInput)
            .then(async (userCredential) => {
                await addUser(userCredential.user.email);
            })
            .catch((error) => {
                if (
                    error.code === "auth/invalid-email" ||
                    error.code === "auth/missing-email"
                ) {
                    setErrorText("Invalid email address");
                } else if (error.code === "auth/weak-password") {
                    setErrorText("Password must be at least 6 characters");
                } else if (error.code === "auth/email-already-in-use") {
                    setErrorText("Email is already in use");
                } else {
                    setErrorText("An error occurred. Please try again.");
                    console.log({ error });
                }
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[24rem]">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Sign up with Google to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSignUpWithGoogle}
                    >
                        <FaGoogle className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 text-muted-foreground bg-card">
                                Or continue with email
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-destructive">
                            {errorText}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleSignUpWithEmailPassword}
                    >
                        Create account
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Log In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
