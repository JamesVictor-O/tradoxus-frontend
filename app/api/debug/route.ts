export const dynamic = 'force-dynamic';
export async function POST() {
  console.log('TEST ROUTE HIT!');
  return Response.json({ success: true });
}
