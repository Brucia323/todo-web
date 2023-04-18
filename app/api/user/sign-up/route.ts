import { FETCH } from '@/lib/utils';

export async function POST(request: Request) {
  const body = await request.json();
  return await fetch('http://localhost:8080/user', {
    method: FETCH.METHOD.POST,
    headers: FETCH.HEADER,
    body: JSON.stringify(body),
  });
}
