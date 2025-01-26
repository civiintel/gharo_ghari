import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'; // Prisma client

export async function GET() {
  try {
    // Fetch all products with their category and reviews
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true, // Fetch the associated category
        reviews: true,  // Fetch associated reviews
      },
    });

    // Format the response
    const formattedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images,
      rating: product.reviews.reduce((sum, review) => sum + review.rating, 0) / (product.reviews.length || 1),
      category: product.category?.name || null,
      createdAt: product.createdAt,
    }));

    return NextResponse.json({ products: formattedProducts });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
