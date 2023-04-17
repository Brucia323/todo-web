const POST = async (request: Request) =>
  await fetch('/login', { method: request.method, body: request.body });

export { POST };
