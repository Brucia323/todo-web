import { HTTP_METHODS } from 'next/dist/server/web/http';

export async function POST(request: Request) {
  const body = await request.json();
  return await fetch('http://localhost:8080/user', {
    method: HTTP_METHODS[3],
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
