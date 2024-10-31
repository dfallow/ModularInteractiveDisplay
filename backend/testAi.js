import OpenAI from "openai";

const key = "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"
const openai = new OpenAI({apiKey: key});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);