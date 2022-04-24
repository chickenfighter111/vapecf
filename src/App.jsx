import { useState, useEffect } from 'react'
import { Navigation } from './components/navigation'
import { Main } from './components/Main'
import { Login } from './components/Login'
import SmoothScroll from 'smooth-scroll'
import * as nearAPI from 'near-api-js'

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
})

const App = () => {
  const [account_id, setAccount] = useState("");
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
    const response = await contract.get_balance({account_id: wallet.getAccountId()}) / 10000000000000000000000;
    setAccount(wallet.getAccountId());
  })
  return (
    <div>
      <Navigation />
      {account_id ? <Main accountId = {account_id}/> : <Login />}
    </div>
  )
}

export default App
