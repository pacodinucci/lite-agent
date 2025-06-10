"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Renders the authentication UI for user registration, login, and session management.
 *
 * Displays forms for creating a new user and logging in when no session exists. If a user is logged in, shows the user's name and a sign-out button.
 *
 * @remark Alerts are shown on authentication success or failure. User input is managed with local component state.
 */
export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onSuccess: () => {
          window.alert("Success!");
        },
        onError: () => {
          window.alert("Something went wrong.");
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Success!");
        },
        onError: () => {
          window.alert("Something went wrong.");
        },
      }
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4 h-screen justify-center items-center">
        <Input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-1/2"
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-1/2"
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          className="w-1/2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4 h-screen justify-center items-center">
        <Input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-1/2"
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          className="w-1/2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
