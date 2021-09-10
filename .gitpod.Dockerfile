FROM gitpod/workspace-full

USER root
RUN wget https://github.com/tendermint/tendermint/releases/download/v0.34.11/tendermint_0.34.11_linux_amd64.tar.gz && \
    tar -xzf tendermint_0.34.11_linux_amd64.tar.gz --directory /usr/local/bin/

USER gitpod
RUN pyenv install 3.9.6 && pyenv global 3.9.6