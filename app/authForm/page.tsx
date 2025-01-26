"use client";

"use client";

// Import necessary components
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/app/store/authStore";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Define schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z.object({
      locality: z.string().min(1, "Locality is required"),
      taluka: z.string().optional(),
      district: z.string().min(1, "District is required"),
      state: z.string().min(1, "State is required"),
      pin: z.string().regex(/^\d{6}$/, "PIN must be 6 digits"),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type FormValues = LoginFormValues &
  Partial<Pick<RegisterFormValues, "confirmPassword" | "phone" | "address">>;

const AuthForm: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const handleRegister = async (data: FormValues) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          mobile: data.phone,
          address: JSON.stringify(data.address)
            .replace(/"/g, "")
            .replace(/{|}/g, ""),
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful! You can now log in.");

        setIsRegister(false);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    }
  };

  const handleLogin = async (data: FormValues) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await res.json();

      if (res.ok) {
        setUser(result.user); // Update Zustand user state
        toast.success("Login successful");
        router.push("/");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  const onSubmit = (data: FormValues) => {
    if (isRegister) {
      handleRegister(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-700">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {isRegister && (
          <>
            <div>
              <Input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your phone number"
                {...register("phone")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your locality"
                {...register("address.locality")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.address?.locality && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.locality.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your Taluka"
                {...register("address.locality")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.address?.taluka && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.taluka.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Enter your district"
                {...register("address.district")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.address?.district && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.district.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your state"
                {...register("address.state")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.address?.state && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.state.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Enter your PIN"
                {...register("address.pin")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.address?.pin && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.pin.message}
                </p>
              )}
            </div>
          </>
        )}
        <Button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isRegister ? "Register" : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="text-blue-600 underline hover:text-blue-800"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
