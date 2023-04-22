#!/usr/bin/env node

import { program } from "commander";
import { prompt } from "enquirer";
import { getCommitMessage } from "./lib/get-commit-message";
import { commit, getDiff } from "./lib/git";
import { resetKey } from "./lib/openai";

async function main() {
  try {
    const diff = getDiff();
    const suggestedMessage = await getCommitMessage(diff);

    const { finalMessage } = await prompt<{ finalMessage: string }>({
      type: "input",
      name: "finalMessage",
      message: "Suggestion:",
      initial: suggestedMessage,
    });

    if (finalMessage) {
      commit(finalMessage);
    }
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
}

program
  .name("commit-assist")
  .description("Commit")
  .action(async () => {
    await main();
    process.exit(0);
  });

program
  .command("reset")
  .description("Reset your OpenAI Key")
  .action(() => {
    resetKey();
    process.exit(0);
  });

program.parseAsync(process.argv);
