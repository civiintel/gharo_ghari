import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma"; // Assuming Prisma client is initialized in `lib/prisma`

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extract the product ID from the dynamic route
    const body = await req.json();
    const { title, description, price, images } = body;

    // Validate the product ID
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Validate required fields
    if (!title || !description || !price || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, price, or images" },
        { status: 400 }
      );
    }

    // Update the product in the database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { title, description, price, images },
    });

    return NextResponse.json({ product: updatedProduct });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating product:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
