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

const { firebaseApp } = require("@/lib/firestore/FirebaseConfig");
const {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} = require("firebase/auth");

export default function LoginCard() {
    const [emailInput, setEmailInput] = React.useState("");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [errorText, setErrorText] = React.useState(null);
    const auth = getAuth(firebaseApp);

    const handleLoginWithGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).then((data) => {
            window.location.href = "/";
        });
    };

    const handleLoginWithEmailPassword = () => {
        signInWithEmailAndPassword(auth, emailInput.trim(), passwordInput)
            .then((userCredential) => {
                window.location.href = "/";
            })
            .catch((error) => {
                if (error.code === "auth/invalid-credential") {
                    setErrorText("Invalid email or password");
                } else if (error.code === "auth/invalid-email") {
                    setErrorText("Invalid email address");
                } else if (error.code === "auth/missing-password") {
                    setErrorText("Invalid password");
                }
                console.log({ error });
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-[24rem]">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl">Log In</CardTitle>
                    <CardDescription>
                        Log in with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLoginWithGoogle}
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
                            onChange={(event) =>
                                setEmailInput(event.target.value)
                            }
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(event) =>
                                setPasswordInput(event.target.value)
                            }
                        />
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleLoginWithEmailPassword}
                    >
                        Log In
                    </Button>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
