console.log(process.env.HF_TOKEN);

export async function generateImage(data: string) {
  const response = await fetch(
    "https://router.huggingface.co/fal-ai/fal-ai/flux/krea",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}
