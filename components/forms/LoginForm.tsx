"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newUser } from "./RegisteredForm";

import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { loginUser } from "@/lib/actions/patients.actions";
import { LoginFormValidation } from "@/lib/validation"; // Ensure you have this schema defined

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);
    setError(null);

    try {
      const { email, password } = values;
      const session = await loginUser(email, password);

      if (session && newUser) { // Use newUser here
        router.push(`/users/${newUser.$id}/dashboard`); // Redirect using newUser.$id
      }
    } catch (error) {
      setError("Invalid email or password.");
      console.error(error);
    }

    setIsLoading(false);
  };


 // Function to handle button click
 const handleButtonClick = () => {
  if (!isLoading) {
    setIsLoading(true); // Set loading state
    setTimeout(() => {
      router.push('/registered'); // Navigate to /registered
    }, 500); // Simulate loading delay
  }
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter your Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name="password"
          label="Password"
          placeholder="Enter your Password"
        />
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;