import { HTTP_METHODS } from 'next/dist/server/web/http';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  return await fetch('http://localhost:8080/todo', {
    method: HTTP_METHODS[0],
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
    method: HTTP_METHODS[3],
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  });
}

export async function PUT(request: Request) {
  const authorization = request.headers.get('Authorization');
  if (authorization === null) {
    redirect('/');
  }
  const body = await request.json();
  return await fetch(`http://localhost:8080/todo/${body.id}`, {
    method: HTTP_METHODS[4],
    headers: {
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    body: JSON.stringify(body),
  });
}
