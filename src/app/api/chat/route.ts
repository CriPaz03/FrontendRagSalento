import {convertToCoreMessages, streamText} from 'ai';
import { openai } from '@ai-sdk/openai';
import { PROMPT, PROMPT_DICT } from "@/src/app/model-helpers";

const { VECTORIZE_API_TOKEN } = process.env;

if (!VECTORIZE_API_TOKEN) {
  throw new Error('VECTORIZE_API_TOKEN is not defined');
}

export async function POST(req: Request) {
  const { messages, data: { model, prompt } } = await req.json();
  const base_prompt = PROMPT_DICT[prompt as PROMPT] ?? PROMPT_DICT["Assistente esperto"];
  let fullPrompt = "";
  let current_message = messages[messages.length - 1].content;
  try {
    const response = await fetch('https://api.vectorize.io/v1/org/ec505dfb-79f7-47e9-ad71-5f33c1acf799/pipelines/aip67a39-7d51-48cc-82a9-8a8b8ab9b1f7/retrieval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': VECTORIZE_API_TOKEN as string,
      },
      body: JSON.stringify({
        question: current_message,
        numResults: 5,
        rerank: true
      })
    });
  
    if (!response.ok) {
      throw new Error(`Errore nella richiesta a Vectorize: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    let chunksText = "";
    data.documents.forEach((chunk: { chunk_id?: string, similarity?: number, text?: string }, index: number) => {
      const sourceId = chunk.chunk_id ?? (index + 1).toString();
      const similarity = chunk.similarity ?? 0;
      const text = chunk.text?.trim() ?? "";
      chunksText += `[source=${sourceId}&relevance=${similarity.toFixed(2)}]\n${text}\n\n`;
    });
  
    fullPrompt = `
    ${base_prompt}
    ${chunksText}
    
    Domanda: ${current_message}
  
    Risposta:
    `;
  } catch (error) {
    console.error("Errore nella richiesta a Vectorize:", error);
  }

  messages[messages.length - 1].content = fullPrompt;
  const result = await streamText({
    model: openai(model) as any,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
  
}