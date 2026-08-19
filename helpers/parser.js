export default async function parseBody(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const body = new URLSearchParams(Buffer.concat(chunks).toString());
  return {
    name: body.get("name"),
    email: body.get("email"),
    message: body.get("message"),
  };
}
