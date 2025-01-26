import {Cart, Order, Product, CartItem, WishlistItem, Delivery, Payment, Wishlist } from '@prisma/client';
import { create } from 'zustand';
import prisma from '../lib/prisma';

type User = {
  id: string;
  email: string;
  role: string;
  address?: string; // Single address as a string
  orders?: Order[];
  carts?: Cart[];
  wishlists?: Wishlist[];
  payments?: Payment[];
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null,

  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));




type Product = {
  id: string;
  title: string;
  images: string[];
  description: string;
  rating: number;
  price: number;
  categoryId: string;
};

type ProductState = {
  products: Product[];
  form: Product;
  isEditing: boolean;
  fetchProducts: () => Promise<void>;
  setForm: (form: Partial<Product>) => void;
  createProduct: () => Promise<void>;
  updateProduct: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleEditing: (editing: boolean) => void;
};

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  form: {
    id: "",
    title: "",
    description: "",
    price: 0,
    rating: 0,
    images: [],
    categoryId: "",
  },
  isEditing: false,
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.products || [] });
  },
  setForm: (form) =>
    set((state) => ({
      form: { ...state.form, ...form },
    })),
  createProduct: async () => {
    const { form, fetchProducts } = get();
    console.log('form',form);
    
    await fetch("/api/products/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    set({
      form: {
        id: "",
        title: "",
        description: "",
        price: 0,
        rating: 0,
        images: [],
        categoryId: "",
      },
    });
    await fetchProducts();
  },
  updateProduct: async () => {
    const { form, fetchProducts } = get();
    await fetch(`/api/products/update/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    set({
      form: {
        id: "",
        title: "",
        description: "",
        price: 0,
        rating: 0,
        images: [],
        categoryId: "",
      },
      isEditing: false,
    });
    await fetchProducts();
  },
  deleteProduct: async (id) => {
    const { fetchProducts } = get();
    await fetch(`/api/products/delete/${id}`, { method: "DELETE" });
    await fetchProducts();
  },
  toggleEditing: (editing) => set({ isEditing: editing }),
}));

type CartItem = {
  id: string; // Unique identifier for each cart item
  productId: string; // Product ID
  title: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity" | "totalPrice">) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getQuantity: (productId: string) => number;
  getTotalQuantity : () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) => {
    set((state) => ({
      cartItems: [
        ...state.cartItems,
        {
          id: `${item.productId}-${Date.now()}`,
          productId: item.productId,
          title: item.title,
          price: item.price,
          quantity: 1,
          totalPrice: item.price,
        },
      ],
    }));
  },
  incrementQuantity: (productId) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.productId === productId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: (cartItem.quantity + 1) * cartItem.price,
            }
          : cartItem
      ),
    }));
  },
  decrementQuantity: (productId) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((cartItem) =>
          cartItem.productId === productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
                totalPrice: (cartItem.quantity - 1) * cartItem.price,
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0), // Remove items with quantity 0
    }));
  },
  getQuantity: (productId) => {
    const item = get().cartItems.find((cartItem) => cartItem.productId === productId);
    return item ? item.quantity : 0;
  },
  getTotalQuantity: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));

type OrderState = {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderDetails: Order & { delivery: Delivery; payment: Payment }) => Promise<void>;
  fetchOrders: (userId: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  currentOrder: null,
  placeOrder: async (orderDetails) => {
    try {
      const order = await prisma.order.create({
        data: {
          ...orderDetails,
          delivery: { create: orderDetails.delivery },
          payment: { create: orderDetails.payment },
        },
      });
      set((state) => ({ orders: [...state.orders, order] }));
    } catch (error) {
      console.error('Error placing order:', error);
    }
  },
  fetchOrders: async (userId) => {
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
        include: { delivery: true, payment: true },
      });
      set({ orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  },
  cancelOrder: async (orderId) => {
    try {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'canceled' },
      });
      set((state) => ({
        orders: state.orders.filter((order) => order.id !== orderId),
      }));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  },
}));

type WishlistState = {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [],
  addToWishlist: (item) =>
    set((state) => ({
      wishlistItems: [...state.wishlistItems, item],
    })),
  removeFromWishlist: (itemId) =>
    set((state) => ({
      wishlistItems: state.wishlistItems.filter((item) => item.id !== itemId),
    })),
  clearWishlist: () => set({ wishlistItems: [] }),
}));
