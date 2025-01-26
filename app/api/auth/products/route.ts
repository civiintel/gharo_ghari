import  prisma  from '@/app/lib/prisma';

export async function GET(req: Request) {
  const userHeader = req.headers.get('user');
  if (!userHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const user = JSON.parse(userHeader);
  if (user.role !== 'ADMIN') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  const products = await prisma.product.findMany();
  return new Response(JSON.stringify(products), { status: 200 });
}
