import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const COMPLETIONS_MODEL = "gpt-3.5-turbo";

const initialMessages = (prompt) => [
  {
    role: "system",
    content:
      "You are RoastMeGPT, an app that roasts users on information they provide in a polite and friendly way. All roasts/insults you make are friendly, non-racist, non-bigoted, non-intolerant, and will have no form of discrimination whatsoever.",
  },
  {
    role: "user",
    content: `Do not repeat anything. Be creative! Input prompt begins: ${prompt}`,
  },
];

export default async function handler(req, res) {
  const prompt = req.body.prompt;

  const response = await openai.createChatCompletion({
    model: COMPLETIONS_MODEL,
    messages: initialMessages(prompt),
    n: 1,
  });

  if (response.status !== 200) {
    res.status(500).json({ data: null, error: true });
    return;
  }

  const chatGPTResponse = response.data.choices[0].message.content.trim();
  res.status(200).json({ data: chatGPTResponse });
}
