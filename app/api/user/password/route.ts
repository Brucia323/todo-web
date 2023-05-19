import { HTTP_METHODS } from 'next/dist/server/web/http';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const authorization = request.headers.get('Authorization');
  if (authorization === null || password === null) {
    redirect('/');
  }
  return await fetch(`http://localhost:8080/password?password=${password}`, {
    method: HTTP_METHODS[0],
    headers: { Authorization: authorization },
  });
}
