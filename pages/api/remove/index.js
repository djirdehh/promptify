export default async function handler(req, res) {
  const image = req.body.image;
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: process.env.REPLICATE_MODEL_VERSION,
      input: {
        original_prompt: "man wearing a black sweater",
        image,
        prompt_edit_type: "Refinement",
        edited_prompt: "man wearing an adidas sweatshirt",
        self_replace_steps: 0.16,
        cross_replace_steps: 0.5,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
