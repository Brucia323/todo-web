import { HTTP_METHODS } from 'next/dist/server/web/http';

export async function GET(
  _request: Request,
  { params }: { params: { email: string } }
) {
  const email = params.email;
  return await fetch(`http://localhost:8080/user/email/${email}`, {
    method: HTTP_METHODS[0],
  });
}
