"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCartStore } from "@/app/store/authStore";

export default function PaymentComponent() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const handlePaymentSelection = (method: React.SetStateAction<string>) => {
    router.push("/orders");
    toast.success(`Selected Payment Method: ${method}`);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return (
    <div className="container mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Choose Payment Method
      </h1>
      <Tabs defaultValue="upi" className="space-y-4">
        <TabsList className="flex justify-center gap-4">
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
        </TabsList>
        <div className="mt-3">
          {cartItems.length > 0 && (
            <div className="mt-2 flex justify-center items-center">
              <p className="text-lg font-semibold">
                Total: ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          )}
        </div>
        {/* UPI Payment */}
        <TabsContent value="upi">
          <Card>
            <CardHeader>
              <CardTitle>Pay via UPI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Enter UPI ID (e.g., user@upi)" />
              <Button
                onClick={() => handlePaymentSelection("UPI")}
                className="w-full"
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Card Payment */}
        <TabsContent value="card">
          <Card>
            <CardHeader>
              <CardTitle>Pay via Credit/Debit Card</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Card Number" />
              <div className="flex gap-4">
                <Input placeholder="MM/YY" className="w-1/2" />
                <Input placeholder="CVV" className="w-1/2" />
              </div>
              <Input placeholder="Cardholder Name" />
              <Button
                onClick={() => handlePaymentSelection("Card")}
                className="w-full"
              >
                Pay Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash on Delivery */}
        <TabsContent value="cod">
          <Card>
            <CardHeader>
              <CardTitle>Cash on Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Pay when the order is delivered to your doorstep.</p>
              <Button
                onClick={() => handlePaymentSelection("Cash on Delivery")}
                className="w-full"
              >
                Confirm Order
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
