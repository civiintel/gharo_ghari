import React, { useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import Link from "next/link";

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <div className="relative">
      {/* User Profile Avatar */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src="https://via.placeholder.com/40"
              alt="User Profile"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col space-y-2">
            <button
              className="text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
              onClick={() => console.log("View Profile clicked")}
            >
              View Orders
            </button>

            <Link
              href="/profile"
              className="text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              Account Settings
            </Link>

            <hr className="my-2" />
            <button
              className="text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserProfile;
