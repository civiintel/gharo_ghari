import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useProductStore } from "../store/authStore";

type ProductFormInputs = {
  title: string;
  images: string[];
  description: string;
  rating: number;
  price: number;
  categoryId: string;
};

export const useProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormInputs>();

  return {
    register,
    handleSubmit,
    errors,
    reset,
  };
};

const ImageUploader = ({
  images,
  setImages,
}: {
  images: string[];
  setImages: (images: string[]) => void;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages([...images, ...uploadedImages]);
    }
  };

  return (
    <div className="mb-4">
      <Label htmlFor="imageUpload">Upload Images</Label>
      <Input
        type="file"
        id="imageUpload"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

// Sample Component
export const ProductForm = () => {
  const { register, handleSubmit, errors, reset } = useProductForm();
  const { form, isEditing, setForm, createProduct, updateProduct } =
    useProductStore();

  const handleProductSubmit = async (data: ProductFormInputs) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price.toString()), // Convert price to a float
      rating: parseFloat(data.rating.toString()), // Convert rating to a float
    };

    setForm(formattedData);
    if (isEditing) {
      await updateProduct();
    } else {
      await createProduct();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin: Manage Products</h1>
      <Card className="p-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit(handleProductSubmit)}>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              value={form.title}
              onChange={(e) => setForm({ title: e.target.value })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <ImageUploader
            images={form.images}
            setImages={(images) => setForm({ images })}
          />
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              value={form.description}
              onChange={(e) => setForm({ description: e.target.value })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="rating">Rating</Label>
            <Input
              id="rating"
              type="number"
              step="0.1"
              {...register("rating", { min: 0, max: 5 })}
              value={form.rating}
              onChange={(e) => setForm({ rating: parseFloat(e.target.value) })}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register("price", { required: "Price is required", min: 0 })}
              value={form.price}
              onChange={(e) => setForm({ price: parseFloat(e.target.value) })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="categoryId">Category ID</Label>
            <Input
              id="categoryId"
              {...register("categoryId")}
              value={form.categoryId}
              onChange={(e) => setForm({ categoryId: e.target.value })}
            />
          </div>
          <div className="flex justify-between">
            <Button type="submit">{isEditing ? "Update" : "Create"}</Button>
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
