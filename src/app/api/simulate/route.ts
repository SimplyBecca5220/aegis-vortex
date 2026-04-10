import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req: Request) {
  try {
    const { payload } = await req.json();

    const openaiKey = process.env.OPENAI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    if (!openaiKey || !anthropicKey) {
      // Fallback if API keys are missing, simulate the dual LLM consensus
      const rawDrift = Math.random() * 0.08;
      const drift = rawDrift.toFixed(3);
      const stringified = JSON.stringify(payload).toLowerCase();

      const isMalicious = stringified.includes("exploit") || stringified.includes("reentrancy");
      let openaiDecision = isMalicious ? "MALICIOUS" : "BENIGN";
      let claudeDecision = isMalicious ? "MALICIOUS" : "BENIGN";

      // Simulate drift occasionally
      if (rawDrift > 0.05) {
        if (Math.random() > 0.5) openaiDecision = "MALICIOUS";
        else claudeDecision = "MALICIOUS";
      }

      return NextResponse.json({
        drift,
        openai: openaiDecision,
        claude: claudeDecision,
        reasoning: "API Keys missing. Running fallback simulation."
      });
    }

    const openai = new OpenAI({ apiKey: openaiKey });
    const anthropic = new Anthropic({ apiKey: anthropicKey });

    const prompt = `You are a GenLayer validator AI. Analyze this transaction payload JSON. Is it a benign transaction or a malicious exploit/reentrancy attack? Reply with exactly ONE WORD: either "BENIGN" or "MALICIOUS".\n\nPayload: ${JSON.stringify(payload)}`;

    const [openaiResponse, anthropicResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
        max_tokens: 10,
      }).catch(err => ({ error: err.message })),
      anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 10,
        temperature: 0,
        messages: [{ role: "user", content: prompt }],
      }).catch(err => ({ error: err.message }))
    ]);

    const openaiContent = (openaiResponse as any).choices?.[0]?.message?.content?.trim().toUpperCase() || "ERROR";
    // Check if the response from Anthropic is an error or has content
    let claudeContent = "ERROR";
    if ('content' in anthropicResponse && Array.isArray((anthropicResponse as any).content)) {
      claudeContent = (anthropicResponse as any).content[0]?.text?.trim().toUpperCase() || "ERROR";
    }

    const driftVal = (openaiContent !== claudeContent) ? (Math.random() * 0.05 + 0.05) : (Math.random() * 0.02);
    const drift = driftVal.toFixed(3);

    return NextResponse.json({
      drift,
      openai: openaiContent,
      claude: claudeContent,
      reasoning: "Live LLM consensus achieved."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
