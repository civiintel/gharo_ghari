"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, useOrderStore } from "@/app/store/authStore"; // Update path to your store
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const router = useRouter();
  const { placeOrder } = useOrderStore();
  const { user } = useAuthStore();

  const handlePlaceOrder = async () => {
    const orderDetails = {
      userId: user?.id,
      products: [], // Populate with actual products from cart
      totalAmount: 100, // Replace with calculated total
      delivery: {
        address: user?.address || "Default Address",
        status: "pending",
      },
      payment: {
        method: "UPI", // Replace with actual payment method
        status: "completed",
      },
      status: "placed",
    };

    // Place the order and navigate to the orders page
    try {
      await placeOrder(orderDetails);
      router.push("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Order Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-4">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="space-y-4">
            <Button onClick={() => router.push("/orders")} className="w-full">
              View My Orders
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
