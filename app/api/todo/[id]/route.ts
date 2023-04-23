import { HTTP_METHODS } from 'next/dist/server/web/http';
import { redirect } from 'next/navigation';

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  const id = params.id;
  const body = await request.json();
  return await fetch(`http://localhost:8080/todo/${id}`, {
    method: HTTP_METHODS[3],
    headers: {
      Authorization: authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
