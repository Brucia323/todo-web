import { HTTP_METHODS } from 'next/dist/server/web/http';

export async function GET(request: Request) {
  return await fetch('http://localhost:8080/user/captcha', {
    method: HTTP_METHODS[0],
  });
}
