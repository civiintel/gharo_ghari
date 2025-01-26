"use client";
import { Button } from "@/components/ui/button";
import { useCartStore, useAuthStore } from "@/app/store/authStore";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import FloatingCart from "./FloatingCart";

export function CartDrawer() {
  const cartItems = useCartStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const handleCheckout = () => {
    if (user) {
      router.push("/payment");
    } else {
      router.push("/authForm");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div>
          <FloatingCart />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Your Cart</DrawerTitle>
            <DrawerDescription>Plaace your order.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <ScrollArea className="max-h-[200px] max-w-[350px] rounded-md border p-4">
              <div className="flex items-center justify-center space-x-2">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <div className="w-full">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center border-b pb-2 mb-2"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <div className="flex items-center space-x-2">
                            <Button
                              className="p-1"
                              variant="secondary"
                              onClick={() => decrementQuantity(item.productId)}
                            >
                              <Minus size={16} />
                            </Button>
                            <p className="text-gray-600 text-sm">
                              {item.quantity}
                            </p>
                            <Button
                              className="p-1"
                              variant="secondary"
                              onClick={() => incrementQuantity(item.productId)}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700 text-sm">
                            ₹{item.price.toFixed(2)}
                          </p>
                          <p className="text-gray-700 text-sm font-semibold">
                            Total: ₹{item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="mt-3">
              {cartItems.length > 0 && (
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    Total: ₹{totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={handleCheckout}> Proceed to Checkout</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
