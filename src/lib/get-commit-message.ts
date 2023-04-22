import axios from "axios";
import { getClient } from "./openai";

const MAX_TOKENS = 100;

export async function getCommitMessage(diff: string): Promise<string | undefined> {
  const client = await getClient();
  const ora = (await import("ora")).default;

  try {
    const spinner = ora("Creating commit message").start();
    const response = await client.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a software developer. Summarize this diff in a commit message: "${diff}"`,
      max_tokens: MAX_TOKENS,
      temperature: 0,
      n: 1,
    });

    if (response.data.choices[0]?.finish_reason !== "stop") {
      throw new Error(`Ran out of tokens. To prevent high costs, the max tokens is set at ${MAX_TOKENS}`);
    }

    spinner.stop();
    return response.data.choices[0]?.text?.trim();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }

    throw new Error(error as string);
  }
}
