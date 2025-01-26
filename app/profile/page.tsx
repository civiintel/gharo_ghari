"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/app/store/authStore";

// Assuming the Prisma schema contains the User model with fields: id, name, email, phone, address

const UserDetailsUpdate = () => {
  const { fetchUserDetails, updateUserDetails, userDetails } = useUserStore();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await fetchUserDetails(); // Fetch user details and populate state
      setLoading(false);
    };

    fetchDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (userDetails) {
      setValue("name", userDetails.name);
      setValue("email", userDetails.email);
      setValue("phone", userDetails.phone);
      setValue("address", userDetails.address);
    }
  }, [userDetails, setValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setLoading(true);
    await updateUserDetails(data);
    setLoading(false);
    alert("User details updated successfully!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Update User Details</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <Button type="submit" variant="default" className="w-full">
            Update Details
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="w-full mt-2"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserDetailsUpdate;
