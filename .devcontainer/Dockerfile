# FROM ubuntu:20.04
# RUN apt update && apt install -y wget unzip
# RUN wget -O tendermint.zip https://github.com/tendermint/tendermint/releases/download/v0.32.6/tendermint_v0.32.6_linux_amd64.zip && \
#     unzip ./tendermint.zip -d /usr/local/bin/
# RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
#     bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3 && \
#     $HOME/miniconda3/bin/conda init bash 
    

FROM mcr.microsoft.com/vscode/devcontainers/universal:1.6.4-linux
USER root 
RUN wget -O tendermint.zip https://github.com/tendermint/tendermint/releases/download/v0.32.6/tendermint_v0.32.6_linux_amd64.zip && \
    unzip ./tendermint.zip -d /usr/local/bin/

USER codespace
COPY ./requirements.txt ./requirements.txt
RUN /opt/conda/bin/pip install -r ./requirements.txt
RUN conda init bash
RUN gh repo clone ANRGUSC/py-abci && /opt/conda/bin/pip install -e ./py-abci
WORKDIR $HOME/app