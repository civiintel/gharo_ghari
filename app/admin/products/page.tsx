"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/app/store/authStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductForm } from "@/app/components/ProductForm";
import { AdminMenuBar } from "@/app/components/AdminMenuBar";

export default function AdminProducts() {
  const { products, fetchProducts, setForm, deleteProduct, toggleEditing } =
    useProductStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPrice, setFilterPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = filterPrice === null || product.price <= filterPrice;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="p-6 mt-5">
      <div className="flex justify-center mb-20">
        <AdminMenuBar />
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-1">
          <ProductForm />
        </div>
        <div className="flex flex-col items-center h-screen">
          <div className="mb-4 flex space-x-4">
            <Input
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Filter by Price (Max)"
              value={filterPrice || ""}
              onChange={(e) =>
                setFilterPrice(
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilterPrice(null);
              }}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Clear Filters
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.rating.toFixed(1)}</TableCell>
                  <TableCell className="flex justify-start gap-4">
                    <Button
                      className="bg-yellow-500 hover:bg-yellow-600"
                      onClick={() => {
                        setForm(product);
                        toggleEditing(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
