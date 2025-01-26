import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/store/authStore";
import { Plus, Minus } from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: number;
};

export const ItemCardButton = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const quantity = useCartStore((state) => state.getQuantity(product.id));

  const handleAdd = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      price: product.price,
    });
  };

  return (
    <>
      {quantity === 0 ? (
        <Button className="mt-2" variant="default" onClick={handleAdd}>
          Add
        </Button>
      ) : (
        <div className="flex items-center gap-2 mt-2">
          <Button
            className="p-1"
            variant="secondary"
            onClick={() => decrementQuantity(product.id)}
          >
            <Minus size={16} />
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            className="p-1"
            variant="secondary"
            onClick={() => incrementQuantity(product.id)}
          >
            <Plus size={16} />
          </Button>
        </div>
      )}
    </>
  );
};
