"use client";
import { Button } from "@/components/ui/button";
import { useCartStore, useAuthStore } from "@/app/store/authStore";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const ViewCart = () => {
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
      router.push("/");
    } else {
      router.push("/authForm");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
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
                  <p className="text-gray-600 text-sm">{item.quantity}</p>
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

      {cartItems.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold">
            Total: ₹{totalPrice.toFixed(2)}
          </p>
          <Button variant="default" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewCart;
