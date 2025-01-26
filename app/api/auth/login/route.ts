import  prisma  from '@/app/lib/prisma';
import { loginSchema } from '@/app/lib/validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const data = loginSchema.parse(body);

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRY! }
    );

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
