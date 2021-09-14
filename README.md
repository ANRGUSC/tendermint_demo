# Tendermint Demo

This tutorial demo starts up a simple instance of Tendermint consensus (single node, just for illustration). 
The ABCI application (smart contract in Tendermint terms) is a simple key-value store which, through transactions, allows clients to set and get the value for keys with the restriction that any new value set must be a longer string than the current value for a given key. 
Transactions are sent via the [Tendermint RPC API](https://docs.tendermint.com/master/rpc/) by an off-chain client application.
Both the ABCI application and the client are written in Python. 
The demo also includes a simple blockchain viewer written in JavaScript that allows the user to visualize all transactions and blocks.

![image](https://user-images.githubusercontent.com/15845210/133292079-6358ade7-0a12-40b9-bb2b-7ab5ce666ee8.png)

**Open with**:
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

Then you can use the [Tendermint RPC API](https://docs.tendermint.com/master/rpc/#/) to interact with tendermint (and our application _through_ tendermint).
```app/client.py``` is a convenience CLI to send/receive data to our application.
Try running the following commands:
```bash
python app/client.py get hello
python app/client.py set hello world
python app/client.py get hello

python app/client.py set hello toast    # rejected - new values for a key must be longer than old values
python app/client.py get hello

python app/client.py set hello toast!
python app/client.py get hello
```

Finally, we have a small GUI to visualize the blockchain, run:
```bash
cd tendermint-gui
yarn start 
```

