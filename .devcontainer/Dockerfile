FROM mcr.microsoft.com/vscode/devcontainers/universal:1-linux

# ** [Optional] Uncomment this section to install additional packages. **
USER root

# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
RUN wget https://github.com/tendermint/tendermint/releases/download/v0.34.11/tendermint_0.34.11_linux_amd64.tar.gz && \
    tar -xzf tendermint_0.34.11_linux_amd64.tar.gz --directory /usr/local/bin/

USER codespace
RUN cd /home/codespace && \
    wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    bash Miniconda3-latest-Linux-x86_64.sh  -b -p /home/codespace/miniconda3
    
RUN /home/codespace/miniconda3/bin/conda init && \
    /home/codespace/miniconda3/bin/conda install pylint mypy flake8 autopep8 pycodestyle pydocstyle && \
    /home/codespace/miniconda3/bin/pip install requests pyyaml abci
