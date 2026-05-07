import * as sandcastle from "@ai-hero/sandcastle";
import { docker } from "@ai-hero/sandcastle/sandboxes/docker";

// Simple example: run a single agent to implement a feature or write tests
const task = process.argv[2] || "implement"; // "implement" or "test"
const title = process.argv[3] || "Add Dark Mode Toggle";
const description = process.argv[4] || "Add a dark mode toggle button to the book cover.";

console.log(`\n🏰 Skill Dictionary Agent\n`);
console.log(`Task: ${task}`);
console.log(`Target: ${title}\n`);

const promptFile =
  task === "test"
    ? "./.sandcastle/test-prompt.md"
    : "./.sandcastle/implement-prompt.md";

const promptArgs = {
  FEATURE_TITLE: title,
  FEATURE_DESCRIPTION: description,
  TARGET: title,
};

try {
  const result = await sandcastle.run({
    sandbox: docker(),
    name: task === "test" ? "TestWriter" : "FeatureImplementer",
    agent: sandcastle.claudeCode("claude-sonnet-4-6"),
    promptFile,
    promptArgs,
  });

  console.log("\n✅ Agent completed!\n");
  console.log("Output:");
  console.log(result.stdout);

  if (result.commits.length > 0) {
    console.log(`\n📝 Commits made: ${result.commits.length}`);
    result.commits.forEach((commit) => {
      console.log(`  - ${commit}`);
    });
  }
} catch (error) {
  console.error("\n❌ Agent failed:");
  console.error(error);
  process.exit(1);
}
