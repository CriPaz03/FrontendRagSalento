import {convertToCoreMessages, streamText} from 'ai';
import { openai } from '@ai-sdk/openai';
import { PROMPT, PROMPT_DICT } from "@/src/app/model-helpers";

const { VECTORIZE_API_TOKEN } = process.env;

if (!VECTORIZE_API_TOKEN) {
  throw new Error('VECTORIZE_API_TOKEN is not defined');
}

export async function POST(req: Request) {
  const { messages, data: { model, prompt } } = await req.json();
  const base_prompt = PROMPT_DICT[prompt as PROMPT] ?? PROMPT_DICT[1];
  let fullPrompt = "";
  try {
    const response = await fetch('https://api.vectorize.io/v1/org/e6ae581f-f84b-4a61-a5d3-6577191030a4/pipelines/aip098f7-e353-4183-a2f6-6d3d35c98192/retrieval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': VECTORIZE_API_TOKEN as string,
      },
      body: JSON.stringify({
        question: messages[0].content,
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
    
    Domanda: ${messages[0].content}
  
    Risposta:
    `;
  } catch (error) {
    console.error("Errore nella richiesta a Vectorize:", error);
  }

  messages[0].content = fullPrompt;
  const result = await streamText({
    model: openai(model) as any,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
  
}