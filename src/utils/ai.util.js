import { Groq } from "groq-sdk/client.js";
import { ApiError } from "./error.util.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const PROMPTS = {
    description: (name) => `Згенеруй апетитний опис страви "${name}".`
}

export const generate = async (prompt) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Ти — копірайтер ресторанного меню. Пишеш короткі, апетитні описи страв у 2-3 речення. Без зайвих слів, тільки опис."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.8
        })

        return response.choices[0]?.message?.content;
    } catch(err) {
        console.error("Generate error: ", err)
        throw new ApiError(500, "Generate error")
    }
}