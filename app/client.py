import argparse 
import requests
from base64 import b64decode
import sys
from datetime import datetime 

def get_value(args: argparse.Namespace) -> None:
    res = requests.get(f'http://localhost:26657/abci_query?data="{args.key}"')
    if res.status_code == 200:
        res_json = res.json()["result"]
        value = b64decode(res_json["response"]["value"].encode("utf-8")).decode("utf-8")
        print(value)
    else:
        print(res.status_code)
        print(res.text)

def set_value(args: argparse.Namespace) -> None:
    res = requests.get(f'http://localhost:26657/broadcast_tx_commit?tx="{args.key}={args.value}={datetime.now()}"')
    # if res.status_code != 200:
    print(res.status_code)
    print(res.text)

def get_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers() 

    set_parser = subparsers.add_parser("set")
    set_parser.set_defaults(action=set_value)
    set_parser.add_argument("key", help="Key for value to add")
    set_parser.add_argument("value", help="Value to add")

    get_parser = subparsers.add_parser("get")
    get_parser.set_defaults(action=get_value)
    get_parser.add_argument("key", help="Key to get value for")

    return parser


def main() -> None:
    parser = get_parser()
    args = parser.parse_args()

    if hasattr(args, "action"):
        args.action(args) 
    else:
        sys.argv.append("--help")
        parser.parse_args()

if __name__ == "__main__":
    main()