"use client";

import { useAuthStore } from "@/app/store/authStore";
import Link from "next/link";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfilePopUp";
import { CategoryMenus } from "./CategoryMenus";

export const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-foreground hover:text-primary">
                Gharo Ghari
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <CategoryMenus />
              <Link
                href="/about"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            {user && user.role === "ADMIN" && (
              <Link
                href="/admin/products"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <SearchBar />
              {!user && (
                <>
                  <Link
                    href="/authForm"
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                </>
              )}
              {user && <UserProfile />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
