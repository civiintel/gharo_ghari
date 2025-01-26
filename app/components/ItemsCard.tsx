import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProductStore } from "@/app/store/authStore";
import Image from "next/image";
import { ItemCardButton } from "./ItemCardButton";

type FoodItemListProps = {
  groupName: string; // specify the type as string
};

export default function ItemsCard({ groupName }: FoodItemListProps) {
  const { products } = useProductStore((state) => state);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">BachatGat {groupName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card className="w-100 h-100" key={product.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{product.title}</CardTitle>
              </div>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={product.images?.[0]}
                alt="product img"
                width={200}
                height={100}
              />
              <Badge variant="secondary">{product.categoryId}</Badge>
              <p className="mt-2 text-2xl font-bold">
                ₹{product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter className="flex align-middle justify-between">
              <Link href={`/product/${product.id}`} passHref legacyBehavior>
                <span className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  View Details
                </span>
              </Link>
              <ItemCardButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
