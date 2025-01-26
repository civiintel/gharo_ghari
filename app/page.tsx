"use client";
import { useEffect } from "react";
import { useProductStore } from "@/app/store/authStore";
import ItemsCard from "./components/ItemsCard";
import OfferSlider from "./components/OfferSlider";
import { Footer } from "./components/Footer";

export default function HomePage() {
  const { products, fetchProducts } = useProductStore((state) => state);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <div className="p-6">
      <OfferSlider />
      <ItemsCard groupName={"ANANDWADI"} />
      <Footer />
    </div>
  );
}
