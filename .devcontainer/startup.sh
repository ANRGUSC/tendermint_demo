#!/bin/bash 

/usr/bin/python3 -m pip install --upgrade pip
pip install --upgrade requests pyyaml six
gh repo clone ANRGUSC/py-abci 
pip install -e ./py-abci
