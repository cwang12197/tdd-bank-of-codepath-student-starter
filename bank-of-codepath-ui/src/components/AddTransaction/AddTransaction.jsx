import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction(props) {
  const [description, setDescription] = React.useState("")
  const [category, setCategory] = React.useState("")
  const [amount, setAmount] = React.useState(0)

  function handleOnFormFieldChange(change) {
    let name = change.target.name

    if (name == "description") {
      setDescription(change.target.value)
    }
    if (name == "category") {
      setCategory(change.target.value)
    }
    if (name == "amount") {
      setAmount(change.target.value)
    }
    props.setForm({
      "description": description,
      "category": category,
      "amount": amount
    })
}

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        handleOnSubmit={props.handleOnSubmit}
        form={props.form}
        setForm={props.setForm}
        isCreating={props.isCreating}
        setIsCreating = {props.setIsCreating}
        

      />
    </div>
  )
}

export function AddTransactionForm(form) {


  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input name="description"
            placeholder="Enter a description"
            type="text"
            value = {form.description}
            onChange={form.handleOnFormFieldChange} />
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category"
            placeholder="Enter a category"
            type="text"
            value={form.category}
            onChange={form.handleOnFormFieldChange} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount"
            placeholder = "Enter an amount"
            type="number"
            value = {form.amount}
            onChange={form.handleOnFormFieldChange} />
        </div>

        <button className="add-transaction"
          type="submit"
          onClick={form.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
