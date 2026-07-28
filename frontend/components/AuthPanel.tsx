"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export function AuthPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setIsLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignUp() {
    setStatusMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setStatusMessage(error.message);
      return;
    }

    setStatusMessage("Check your email to confirm your account.");
  }

  async function handleSignIn() {
    setStatusMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatusMessage(error.message);
      return;
    }

    setStatusMessage("Signed in successfully.");
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setStatusMessage("Signed out.");
  }

  if (isLoading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Loading account...</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Parent Account</h2>

      {user ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="min-h-10 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="min-h-11 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-teal-600"
          />
          <button
            type="button"
            onClick={handleSignIn}
            className="min-h-11 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="min-h-11 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sign up
          </button>
        </div>
      )}

      {statusMessage && (
        <p className="mt-3 text-sm text-slate-600">{statusMessage}</p>
      )}
    </section>
  );
}