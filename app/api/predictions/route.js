import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NGROK_HOST;

export async function POST(request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
        'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const { prompt } = await request.json();

  // const output = await replicate.run("bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f", { input });
  //version: '5839ce85291601c6af252443a642a1cbd12eea8c83e41f27946b9212ff845dbf',

  const options = {
    version: '4acb778eb059772225ec213948f0660867b2e03f277448f18cf1800b96a65a1a',
    input: {
      prompt: prompt,
    }
  }

  let prediction = await replicate.predictions.create(options);

  //if (WEBHOOK_HOST) {
  //  options.webhook = `${WEBHOOK_HOST}/api/webhooks`
  //  options.webhook_events_filter = ["start", "completed"]
  //}

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}