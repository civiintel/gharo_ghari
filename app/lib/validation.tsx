// app/lib/schemas.ts
import { z } from "zod";

/** Authentication Schemas */
export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

/** Product Schemas */
export const productSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z.string().optional(),
  price: z.number().positive({ message: "Price must be greater than 0" }),
  stock: z
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer" }),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const productQuerySchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  category: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export type ProductQuerySchema = z.infer<typeof productQuerySchema>;

/** Cart Schemas */
export const cartItemSchema = z.object({
  userId: z.number().int({ message: "User ID must be an integer" }),
  productId: z.number().int({ message: "Product ID must be an integer" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be at least 1" }),
});

export type CartItemSchema = z.infer<typeof cartItemSchema>;

export const updateCartSchema = z.object({
  cartItemId: z.number().int({ message: "Cart item ID must be an integer" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be at least 1" }),
});

export type UpdateCartSchema = z.infer<typeof updateCartSchema>;

/** Order Schemas */
export const createOrderSchema = z.object({
  userId: z.number().int({ message: "User ID must be an integer" }),
  cartItems: z
    .array(
      z.object({
        productId: z.number().int({ message: "Product ID must be an integer" }),
        quantity: z
          .number()
          .int()
          .positive({ message: "Quantity must be at least 1" }),
        price: z.number().positive({ message: "Price must be greater than 0" }),
      })
    )
    .nonempty({ message: "Cart items cannot be empty" }),
});

export type CreateOrderSchema = z.infer<typeof createOrderSchema>;

export const orderQuerySchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export type OrderQuerySchema = z.infer<typeof orderQuerySchema>;

/** Payment Schemas */
export const paymentSchema = z.object({
  orderId: z.number().int({ message: "Order ID must be an integer" }),
  amount: z.number().positive({ message: "Amount must be greater than 0" }),
  currency: z.string().min(1, { message: "Currency is required" }),
});

export type PaymentSchema = z.infer<typeof paymentSchema>;

export const paymentVerificationSchema = z.object({
  paymentId: z.string().min(1, { message: "Payment ID is required" }),
  orderId: z.number().int({ message: "Order ID must be an integer" }),
  status: z.enum(["SUCCESS", "FAILED", "PENDING"], {
    message: "Invalid payment status",
  }),
});

export type PaymentVerificationSchema = z.infer<
  typeof paymentVerificationSchema
>;

/** User Profile Schemas */
export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional(),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const addressSchema = z.object({
  userId: z.number().int({ message: "User ID must be an integer" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
});

export type AddressSchema = z.infer<typeof addressSchema>;

/** Wishlist Schemas */
export const wishlistSchema = z.object({
  userId: z.number().int({ message: "User ID must be an integer" }),
  productId: z.number().int({ message: "Product ID must be an integer" }),
});

export type WishlistSchema = z.infer<typeof wishlistSchema>;

/** Review and Rating Schemas */
export const reviewSchema = z.object({
  userId: z.number().int({ message: "User ID must be an integer" }),
  productId: z.number().int({ message: "Product ID must be an integer" }),
  rating: z
    .number()
    .int()
    .min(1)
    .max(5, { message: "Rating must be between 1 and 5" }),
  comment: z.string().optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

/** Admin Schemas */
export const adminProductSchema = z.object({
  productId: z.number().int({ message: "Product ID must be an integer" }),
  action: z.enum(["ADD", "UPDATE", "DELETE"], { message: "Invalid action" }),
});

export type AdminProductSchema = z.infer<typeof adminProductSchema>;

export const adminOrderSchema = z.object({
  orderId: z.number().int({ message: "Order ID must be an integer" }),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED"], {
    message: "Invalid status",
  }),
});

export type AdminOrderSchema = z.infer<typeof adminOrderSchema>;

/** Common Schemas */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
