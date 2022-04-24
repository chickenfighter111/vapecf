import { useEffect, useState } from "react";
import * as nearAPI from "near-api-js";
import heads from "./data/heads.png";
import tails from "./data/tails.png";
import useSound from "use-sound";
import winning from "./data/winning.gif"
import winner from "./data/win.wav";
import lost from "./data/lost.wav";

export const Main = (props) => {
  const [flip, setFlip] = useState("");
  const [depo, setDepo] = useState(0);
  const [vic, setVic] = useState(false);
  const [AccountId, setAccountId] = useState("");
  const [list, setList] = useState([]);
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audio1] = useSound(winner);
  const [audio2] = useSound(lost);
  const [win1] = useState("and WON");
  const [lost1] = useState("and got rekt");
  const { connect, KeyPair, keyStores, WalletConnection} = nearAPI;

  const config = {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  };

  useEffect(async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await fetch('https://vexed-ape-server.vercel.app/api/find')
    .then(response => response.json())
    .then(data => {
      for(var i = 0; i < data.length; i++) {
        list.push(data[i]);
      }
    })
    .catch((err) => {
      console.log(err)
    })
    setCheck(false);
    const response = await contract.get_balance({account_id: wallet.getAccountId()}) / 10000000000000000000000;
    setDepo(Math.floor(response) / 100);
    setAccountId(wallet.getAccountId());
  }, [list, check])

  const onHeads = () => {
    setFlip("Heads");
  }
  const onTails = () => {
    setFlip("Tails");
  }
  const deposit1 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "250000000000000000000000"
    );
  }
  const deposit2 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "500000000000000000000000"
    );
  }
  const deposit3 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "1000000000000000000000000"
    );
  }
  const deposit4 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "2000000000000000000000000"
    );
  }
  const deposit5 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "3000000000000000000000000"
    );
  }
  const deposit6 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "4000000000000000000000000"
    );
  }
  const deposit7 = async () => {
    const near = await connect(config);
    const wallet =  new WalletConnection(near);
    const contract = await new nearAPI.Contract(
      wallet.account(),
      "vexedapesclubhousewallet.near",
      {
        viewMethods: ["get_balance"],
        changeMethods: ["deposit", "play"],
        sender: wallet.getAccountId(),
      }
    );
    await contract.deposit(
      {}, 
      "300000000000000",
      "5000000000000000000000000"
    );
  }
  const onPlay = async () => {
    if(!flip || depo == 0) {
      alert("Please deposit fund or Select Coin");
    }
    else {
      setIsLoading(false);
      const near = await connect(config);
      const wallet =  new WalletConnection(near);
      const contract = await new nearAPI.Contract(
        wallet.account(),
        "vexedapesclubhousewallet.near",
        {
          viewMethods: ["get_balance"],
          changeMethods: ["deposit", "play"],
          sender: wallet.getAccountId(),
        }
      );
      var response = await contract.get_balance({account_id: wallet.getAccountId()}) / 10000000000000000000000;
      const re = await contract.play(
        {
          opt_bal: Math.floor(response)
        },
        "300000000000000",
      );
      //database
      await fetch('https://vexed-ape-server.vercel.app/api/register', {
          method: 'post',
          body: JSON.stringify({AccountId, depo, flip, re}),
          headers: {
            'Content-Type': 'application/json'
          }
      });
      setIsLoading(true);
      if(re === true) {
        setCheck(true);
        audio1();
        setVic(true);
      }
      else if(re === false) {
        setCheck(true);
        audio2();
        alert("Failed!");
      }
      setFlip("");
      setDepo(0);
    }
  }
  const onVic = () => {
    setVic(false);
  }
  return (
    <div className='main text-center'>
      {!vic ?
        <div className='container'>
          <div className='section-title'>
            <h2>{props.accountId}</h2>
          </div>
          <div className='row'>
            <div className='main-items'>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <img src = {heads} width = "80%" alt= "" onClick = {onHeads} />
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                {isLoading ? 
                  <button type = 'button' className = 'btn btn-warning btn-block' onClick = {onPlay}>Play</button> :
                  <button type = 'button' className = 'btn btn-info btn-block'>
                    <span className = "spinner-border spiiner-border-sm"></span>Loading...
                  </button>
                }
                <div className = 'select'>Option: {flip}</div>
                <div className = 'select'>Deposit: {depo} Near</div>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <img src = {tails} width = "80%" alt= "" onClick = {onTails} />
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit1}>0.25 Near</button>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit2}>0.5 Near</button>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit3}>1 Near</button>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit4}>2 Near</button>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit5}>3 Near</button>
              </div>
              <div className='col-sm-4 col-md-4 col-lg-4'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit6}>4 Near</button>
              </div>
              <div className='col-sm-12 col-md-12 col-lg-12'>
                <button type = 'button' className = 'btn btn-warning btn-block' onClick = {deposit7}>5 Near</button>
              </div>
            </div>
            <div className='col-sm-12 col-md-12 col-lg-12'>
              <ul className = "list-group">
                {!list.length ? 
                  <></> :
                    list.map((v, i) => 
                      <li key = {i} className = "list-group-item">
                        {list[list.length - (i + 1)].AccountId + " "} 
                        flipped 
                        {" " + list[list.length - (i + 1)].depo + " "}
                        Near for
                        {" " + list[list.length - (i + 1)].flip + " "}
                        {
                          list[list.length - (i + 1)].re=="true" ?
                          <span className = "text-success">{win1}</span> : <span className = "text-danger">{lost1}</span>
                        }
                      </li>
                    )
                  }
              </ul>
            </div>
          </div>
        </div> :
        <img className="victory" src = {winning} width="100%" onClick = {onVic} /> }
    </div>
  )
}
