import alchemy from './Alchemy';
import { useEffect, useState } from 'react';


export default function CurrentBlock() {

const [currentBlock, setcurrentBlock] = useState();
const [gasPrice, setGasPrice] = useState();
const [timeStamp, setTimeStamp] = useState();
const [hash, setHash] = useState();
const [txnsNum, setTxnsNum] = useState();

getcurrentBlock();
getGasPrice();

useEffect(() => {
  const interval = setInterval(() => {
    getcurrentBlock();
    getGasPrice();
  }, 5000);

  return () => clearInterval(interval);

},[]);

useEffect(() => {
  async function blockInfo() {
      const block = await alchemy.core.getBlock(currentBlock);
      setHash(block.hash);
      setTimeStamp(block.timestamp);
      setTxnsNum(block.transactions.length);
  }
  blockInfo();
}, [currentBlock])

async function getcurrentBlock() {
  setcurrentBlock(await alchemy.core.getBlockNumber());
}

async function getGasPrice() {
  setGasPrice((await alchemy.core.getGasPrice()).div(10 ** 9).toString());
}

function convertUnixTime(timeStamp) {
    const unixTimestamp = timeStamp * 1000;
    const dateObject = new Date(unixTimestamp);
    const humanDateFormat = dateObject.toLocaleString("en-GB");
  
    return humanDateFormat;
}


return (
    
    <div className="block-container">
      <div className="block-box">
        <h3>Block: {currentBlock}</h3>
        <p>Hash: {hash}</p>
        <p>TimeStamp: {convertUnixTime(timeStamp)}</p>
        <p> <b>{txnsNum}</b> Transactions</p>
      </div>
    
        <div className="gas-box">
         <span>{gasPrice} gwei</span>
        </div>
    </div>
  
    
)

}
