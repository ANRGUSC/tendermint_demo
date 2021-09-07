import pathlib 
import shutil 
import subprocess
import toml

thisdir = pathlib.Path(__file__).resolve().parent
home = pathlib.Path.home()

def main():
    tendermint = home.joinpath(".tendermint")
    if tendermint.exists():
        shutil.rmtree(tendermint)

    subprocess.Popen(["tendermint", "init"]).wait()

    config_path = tendermint.joinpath("config", "config.toml")
    config = toml.loads(config_path.read_text())
    config["rpc"]["cors_allowed_origins"] = [
        "https://jaredraycoleman-anrgusc-tendermint-demo-9qq4r64jhxwq6-3000.githubpreview.dev"
    ]
    config_path.write_text(toml.dumps(config))

    
    subprocess.Popen(["tendermint", "node"]).wait()

    

if __name__ == "__main__":
    main()
