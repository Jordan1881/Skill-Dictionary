FROM node:22-bookworm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  jq \
  && rm -rf /var/lib/apt/lists/*

# Install GitHub CLI
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
  | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
  | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get update && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

# Build-args for UID/GID alignment
ARG AGENT_UID=1000
ARG AGENT_GID=1000

# Create agent user aligned to host UID/GID
RUN userdel -r node 2>/dev/null || true && \
    (groupadd -g $AGENT_GID agent 2>/dev/null || groupmod -n agent $(getent group $AGENT_GID | cut -d: -f1) 2>/dev/null || true) && \
    useradd -u $AGENT_UID -g $AGENT_GID -d /home/agent -m -s /bin/bash agent && \
    mkdir -p /home/agent && \
    chown $AGENT_UID:$AGENT_GID /home/agent && \
    chmod 755 /home/agent

USER ${AGENT_UID}:${AGENT_GID}

# Install Claude Code CLI
RUN curl -fsSL https://claude.ai/install.sh | bash

# Add Claude to PATH
ENV PATH="/home/agent/.local/bin:$PATH"

WORKDIR /home/agent

# In worktree sandbox mode, Sandcastle bind-mounts the git worktree at /home/agent/workspace
ENTRYPOINT ["sleep", "infinity"]
