import alchemy from './Alchemy';
import Popup from './TransactionDetails';
import { useState } from 'react';
  
export default function SearchBox() {

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setselectedTransaction] = useState("");

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [blockError, setBlockError] = useState("")

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchClick = async () => {
    try {
      const result = await getSearchResult(search);
      setSearchResult(result);
      setBlockError("")
    } catch {
      setSearchResult("")
      setBlockError("Block does not exist")
    }
  }

  const handleTransactionClick = async (transactionNumber) => {
    const result = await alchemy.core.getTransaction(`${transactionNumber}`)
    setselectedTransaction(JSON.stringify(result, null, 2))
  }

  async function getSearchResult(blockNumber) {
    const response = await alchemy.core.getBlock(Number(blockNumber));
    setTransactions(response.transactions)

    return response;
  }

  function generateTransactionsButtons() {
    return transactions.map((transaction, index) => (
      <div key={index}>
        <button className="button-t1" 
                onClick={() => {handleTransactionClick(transaction);
                                togglePopup();}}>{transaction}</button>
        <br />
      </div>
    ));
  }
  
  function convertUnixTime() {
  const unixTimestamp = searchResult.timestamp * 1000;
  const dateObject = new Date(unixTimestamp);
  const humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;

  }


return (
  <>
  <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
  <input className="box-search" type="text" value={search} onChange={handleSearchChange} />
  <button className="button-search" onClick={handleSearchClick}>Get Block Info</button>
  </div>
  <br/>
  { searchResult ? (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <div className="row">
        <div>
          <p>
            <strong >
              Block info:
            </strong>
          </p>
          <br/>
          <div style={{whiteSpace: "pre-wrap"}}>
            <div>Hash: {searchResult.hash}</div>
            <div>Timestamp: {convertUnixTime()}</div>
            <div> <b>{searchResult.transactions.length}</b> Transactions</div>
          </div>
        </div>

        <div>
          <p>
            <strong>
              Transactions in block number: {search}
            </strong>
          </p>
          <div>
            {generateTransactionsButtons()}
          </div>
        </div>

        { selectedTransaction ? (<div>
                  {isOpen && <Popup
                        content={<>
                          <h2 style={{color: "#27ae60", textAlign: "center"}}>Transaction details</h2>
                          &nbsp;
                          <pre>{selectedTransaction}</pre>
                        </>}
                        handleClose={togglePopup} 
                  />}
                </div>) : (<div></div>) }
              </div>
            </div>
          ) : (<div>{blockError}</div>) }
        </>
       
    )    
}        