import { execSync } from "child_process";

export function getDiff(): string {
  const diff = execSync("git diff --staged -- ':!yarn.lock'").toString();

  if (!diff) {
    throw new Error("❌ No staged diff! Stage the changes you want to commit first.");
  }

  return diff;
}

export function commit(message: string) {
  execSync(`git commit -m "${message}"`);
}
