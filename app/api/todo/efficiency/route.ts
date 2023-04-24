import { HTTP_METHODS } from 'next/dist/server/web/http';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  return await fetch('http://localhost:8080/efficiency', {
    method: HTTP_METHODS[0],
    headers: { Authorization: authorization },
  });
}
