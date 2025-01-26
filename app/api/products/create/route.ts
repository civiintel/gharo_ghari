import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'; // Assuming Prisma client is initialized in `lib/prisma`

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, price, images } = body;
console.log('price',price);

    // Validate required fields
    if (!title || !description || !price || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, price, or images' },
        { status: 400 }
      );
    }

    // Create the product in the database
    const product = await prisma.product.create({
      data: { title, description, price, images },
    });

    return NextResponse.json({ product });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating product:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
