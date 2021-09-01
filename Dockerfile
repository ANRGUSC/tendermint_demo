FROM ubuntu:20.04
RUN apt update && apt install -y wget unzip
RUN wget -O tendermint.zip https://github.com/tendermint/tendermint/releases/download/v0.32.6/tendermint_v0.32.6_linux_amd64.zip && \
    unzip ./tendermint.zip -d /usr/local/bin/
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3 && \
    $HOME/miniconda3/bin/conda init bash
COPY ./requiremets.txt ./requirements.txt 
RUN pip install -r requirements.txt 