"use client";

import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({
  role,
  children,
}: {
  role: string;
  children: React.ReactNode;
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== role) {
      router.push("/"); // Redirect to login if unauthorized
    }
  }, [user, role, router]);

  if (!user || user.role !== role) {
    return null; // Prevent rendering unauthorized content
  }

  return <>{children}</>;
}
