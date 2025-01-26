"use client";

import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { supabase } from "@/app/lib/supabaseClient";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        // Handle user data if available
        if (data?.user) {
          const userEmail = data.user.email ?? "unknown@example.com"; // Fallback email
          setUser({ id: data.user.id, email: userEmail, role: "user" }); // Adjust role as needed
        }

        // Log error only if it's meaningful
        if (error?.message) {
          console.log("Error fetching user:", error.message);
        }
      } catch (unexpectedError) {
        // Catch any unexpected runtime errors
        console.error("Unexpected error fetching user:", unexpectedError);
      }
    };

    getUser();
  }, [setUser]);

  return <>{children}</>;
};
