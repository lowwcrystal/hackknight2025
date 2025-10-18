export default async function urlToBase64(url: string): Promise<{ b64: string; mime: string }> {
  const response = await fetch(url);
  if (!response.ok){
    throw new Error(`Fetch failed: ${response.status}`);
  }
  const mime = response.headers.get("content-type") || "image/jpeg";
  const buffer = Buffer.from(await response.arrayBuffer());
  return { b64: buffer.toString("base64"), mime };
}