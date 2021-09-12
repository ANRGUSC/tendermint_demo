# Tendermint Demo

Open with:
- [Gitpod, by clicking here](https://gitpod.io/#https://github.com/ANRGUSC/tendermint_demo) (recommended)
- Codespaces (see the "Code" button above)
- VSCode on your PC (see next section)

## Running on VSCode Desktop (Skip this section if you're using codespaces or gitpod)
1. Make sure you have [VSCode](https://code.visualstudio.com/) and [Docker](https://docs.docker.com/get-docker/) installed
1. Install the following extensions
    - Remote Development
    - Docker 

Then, to open in the developer environment, clone the repository:
```bash
git clone git@github.com:ANRGUSC/tendermint_demo.git
```

Open it in code:
```
code ./tendermint_demo
```

Click the green button in the bottom-left-hand corner of your IDE to access the remote-tools options and select "Reopen in Container".
The first time it make take a while to open, but next time it should be fast!

## Running Demo
First, open a terminal and run 
```bash
python app/restart_tm_node.py 
```
This convenience script just configures, adds a few settings, and begins running a full tendermint consensus node.

Then, in a new terminal, start the ABCI application (our application logic):
```bash
python app/app.py 
```

Then you can use the Tendermint RPC API to interact with tendermint (and our application _through_ tendermint).
```app/client.py``` is a convenience CLI to send/receive data to our application.
Try running the following commands:
```bash
python client.py get hello
python client.py set hello world
python client.py get hello

python client.py set hello toast    # rejected - new values for a key must be longer than old values
python client.py get hello

python client.py set hello toast!
python client.py get hello
```

Finally, we have a small GUI to visualize the blockchain, run:
```bash
cd tendermint-gui
yarn start 
```

