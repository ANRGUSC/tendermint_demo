FROM mcr.microsoft.com/vscode/devcontainers/universal:1-linux

# ** [Optional] Uncomment this section to install additional packages. **
USER root

# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
RUN wget -O tendermint.zip https://github.com/tendermint/tendermint/releases/download/v0.32.6/tendermint_v0.32.6_linux_amd64.zip && \
    unzip ./tendermint.zip -d /usr/local/bin/

USER codespace
COPY ./startup.sh /home/codespace/startup.sh
