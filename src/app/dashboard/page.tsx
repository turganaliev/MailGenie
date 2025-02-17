"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/auth/sign-in"); // Redirect if not signed in
    }
  }, [isSignedIn]);

  if (!isSignedIn) return null; // Prevents flickering before redirect

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are successfully logged in.</p>
    </div>
  );
}
