import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home(props) {
  const URL = "http://localhost:3001/bank/"

  const handleOnSubmitNewTransaction = (event) => {
    props.setNewTransactionForm(event.target.value)
  }

  React.useEffect(() => {
    props.setIsLoading(true)
    axios.get(`${URL}transactions`).then((response) => {
      props.setTransactions(response.data.transactions)
    }).catch((error) => {
      props.setError("invalid transaction")
    }).then(() => {
      props.setIsLoading(false)
    })
  }, [])

  React.useEffect(() => {
    props.setIsLoading(true)
    axios.get(`${URL}transfers`).then((response) => {
      props.setTransfers(response.data.transfers)
    }).catch((error) => {
      setError("invalid transfers")
    }).then(() => {
      props.setIsLoading(false)
    })
  }, [])

  let filteredTransactions = props.transactions
  if (props.filterInputValue && props.transactions) {
    filteredTransactions = filteredTransactions.filter(item =>
      item.description.toLowerCase().includes(props.filterInputValue.toLowerCase()))
    }
  
  async function handleOnCreateTransaction() {
    setIsCreating(true)
    axios.post(`${URL}transactions`, newTransactionForm).then((response) => {
      props.setTransactions(response)
    }).catch((error) => {
      setError("Error 404")
      setIsCreating(false)
    }).then((response) => {
      setNewTransactionForm("")
      setIsCreating(false)
    })
}
  
    return (
      <div className="home">
        <AddTransaction
          isCreating={props.isCreating}
          setIsCreating={props.setIsCreating}
          form={props.newTransactionForm}
          setForm={props.setNewTransactionForm}
          handleOnSubmit={handleOnSubmitNewTransaction}
        />
        {props.isLoading ? <h1>Loading...</h1> :
          <BankActivity transactions={filteredTransactions} />
        }
        {props.error ? <h2 className = "error">{props.error}</h2> : false}
      </div>
    )
  }
