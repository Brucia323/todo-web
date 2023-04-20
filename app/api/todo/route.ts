import { FETCH } from '@/lib/utils';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  return await fetch('http://localhost:8080/todo', {
    method: FETCH.METHOD.GET,
    headers: {
      Authorization: authorization,
    },
  });
}

export async function POST(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  const body = await request.json();
  return await fetch('http://localhost:8080/todo', {
    method: FETCH.METHOD.POST,
    headers: {
      Authorization: authorization,
      ...FETCH.HEADER,
    },
    body: JSON.stringify(body),
  });
}
