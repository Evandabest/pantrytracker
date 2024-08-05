"use client";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signup, login } from "./actions";
import { useState } from "react";


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const handlesignUp = async (e: any) => {
    
    await signup({email, password});
  };

  const handlesignIn = async (e: any) => {
    await login({email, password});
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black p-8 rounded-md">
      <h2 className="font-bold text-xl text-center text-neutral-200 dark:text-neutral-800">
        Welcome to smart pantry
      </h2>
      <p className="text-neutral-300 text-center text-sm max-w-sm mt-8 dark:text-neutral-600">
        Sign in or sign up to continue
      </p>

      <form className="my-1">
        
        <LabelInputContainer className="my-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} onChange={handleEmail} placeholder="myemailaddress.com" type="email" required/>
        </LabelInputContainer>
        <LabelInputContainer className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={handlePassword} placeholder="••••••••" type="password" required/>
        </LabelInputContainer>
        <div className="flex items-center justify-between my-8 space-x-2">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handlesignUp}
          >
            Sign up
            <BottomGradient />
          </button>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            formAction={handlesignIn}
          >
            Sign in
            <BottomGradient />
          </button>
        </div>


      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};