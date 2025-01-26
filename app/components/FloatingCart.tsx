"use client";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/app/store/authStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FloatingCart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const getTotalQuantity = useCartStore((state) => state.getTotalQuantity);

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      {/* Cart Icon with Badge */}
      <div className="relative">
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          aria-label="Cart"
        >
          <ShoppingCart size={24} />
          {getTotalQuantity() > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getTotalQuantity()}
            </Badge>
          )}
        </button>
      </div>

      {/* Proceed to Checkout Button */}

      {cartItems.length > 0 && (
        <Button className="ml-2" variant="secondary">
          View Cart
        </Button>
      )}
    </div>
  );
};

export default FloatingCart;
