import  prisma  from '@/app/lib/prisma';
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    // Parse request body
    const { email, password, mobile, address } = await req.json();
    // Validate required fields
    if (!email || !password || !mobile) {
      return NextResponse.json(
        { error: "Email, password, and mobile are required." },
        { status: 400 }
      );
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        mobile,
        address: address || null, // Save the address if provided, else null
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error during user registration:", error);

    // Handle unique constraint violations
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: `Duplicate field: ${error.meta.target}` },
        { status: 409 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}

