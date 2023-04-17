const POST = async (request: Request) =>
  await fetch('/user', { method: request.method, body: request.body });

export { POST };
