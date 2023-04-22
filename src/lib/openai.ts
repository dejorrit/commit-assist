import { prompt } from "enquirer";
import * as fs from "fs";
import { Configuration, OpenAIApi } from "openai";
import { homedir } from "os";
import * as path from "path";

const keyLocation = path.join(homedir(), ".commit-buddy");

async function getKey(): Promise<string> {
  if (fs.existsSync(keyLocation)) {
    return fs.readFileSync(keyLocation).toString();
  }

  const { key } = await prompt<{ key: string }>({
    type: "password",
    name: "key",
    message: "Please enter your OpenAI API Key",
  });

  if (!key) {
    throw new Error("❌ No API Key given");
  }

  fs.writeFileSync(keyLocation, key);
  return key;
}

export function resetKey(): void {
  if (fs.existsSync(keyLocation)) {
    return fs.unlinkSync(keyLocation);
  }
}

export async function getClient(): Promise<OpenAIApi> {
  const apiKey = await getKey();
  return new OpenAIApi(new Configuration({ apiKey }));
}
