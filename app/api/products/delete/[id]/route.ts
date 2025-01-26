import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    // Validate the product ID
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Delete the product from the database
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error deleting product:', error.message);
    return NextResponse.json(
      { error: 'Failed to delete the product' },
      { status: 400 }
    );
  }
}

