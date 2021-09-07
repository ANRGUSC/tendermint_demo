#!/bin/bash

if [ -d "$HOME/.tendermint" ] 
then
    rm -rf "$HOME/.tendermint"
fi

tendermint init 
tendermint node 
