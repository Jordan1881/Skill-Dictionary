# Skill Dictionary + Sandcastle

This directory contains the Sandcastle setup for automating development tasks on Skill Dictionary using Claude agents running in Docker.

## Setup

### 1. Add Your API Keys

Edit `.env` and add:
```
ANTHROPIC_API_KEY=your_key_from_console.anthropic.com
GH_TOKEN=your_github_token_from_github.com/settings/tokens
```

### 2. Build the Docker Image

```bash
cd ~/sandcastle
npx sandcastle docker build-image
```

This builds the `sandcastle:sandcastle` Docker image used by all Sandcastle projects.

## Usage

### Implement a Feature

```bash
npx tsx --env-file=.sandcastle/.env .sandcastle/run.ts implement "Feature Name" "Feature Description"
```

**Example:**
```bash
npx tsx --env-file=.sandcastle/.env .sandcastle/run.ts implement "Add Keyboard Navigation" "Add arrow key support to flip pages"
```

**What happens:**
1. Claude agent reads your codebase
2. Implements the feature in isolated Docker container
3. Writes tests
4. Makes a Git commit
5. Returns stdout with results

### Write Tests

```bash
npx tsx --env-file=.sandcastle/.env .sandcastle/run.ts test "ComponentName"
```

**Example:**
```bash
npx tsx --env-file=.sandcastle/.env .sandcastle/run.ts test "useSkills Hook"
```

## How It Works

- **Sandbox**: Docker container with Node.js, Git, GitHub CLI, Claude CLI
- **Agent**: Claude Sonnet (claude-sonnet-4-6)
- **Prompts**: Customized for Skill Dictionary's tech stack
- **Git Integration**: Changes are committed to isolated branches

## Files

- `.env` - API keys (add your own)
- `Dockerfile` - Container definition
- `run.ts` - Orchestration script
- `implement-prompt.md` - Feature implementation prompt
- `test-prompt.md` - Test writing prompt
- `logs/` - Agent output logs (created on first run)
- `worktrees/` - Isolated Git worktrees (created on first run)

## Troubleshooting

**Docker image not found:**
```bash
cd ~/sandcastle && npx sandcastle docker build-image
```

**Permission denied errors:**
Ensure `~/.claude/skills/` exists (even if empty).

**Prompt argument errors:**
Check that all `{{VARIABLE}}` placeholders in prompts match `promptArgs` in `run.ts`.

## Next Steps

1. Run a simple test: `npx tsx --env-file=.sandcastle/.env .sandcastle/run.ts test "Book Component"`
2. Implement a feature from your issues
3. Monitor logs: `tail -f .sandcastle/logs/*`

Happy automating! 🤖
