import {useState} from "react";
import Button from "../Button/button";
import styles from "./formSplitBill.module.css";

function FormSplitBill({selectedFriend, onSplitBill}) {

    const [bill, setBill] = useState("");
    const [message, setMessage] = useState({billMessage: "", expensesMessage: "", mainMessage: ""});
    const [userExpense, setUserExpense] = useState("");
    const friendExpense = bill ? bill - userExpense : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");
    function isNumber(value) {
        return !isNaN(value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!bill || !userExpense) setMessage({...message, mainMessage: "Please fill the blanks"})
        else {
            onSplitBill(whoIsPaying === "user" ? friendExpense : -userExpense);
            message.mainMessage && setMessage({billMessage: "", expensesMessage: "", mainMessage: ""})
            setBill("");
            setUserExpense("");
            setWhoIsPaying("user");
        }
    }
    const handleBillValue = (e) => {
        if(isNumber(e.target.value)){
            setBill(e.target.value);
            message.billMessage && setMessage({...message, billMessage: ""})

        }else{
            setMessage({...message, billMessage: "Please enter number"});
            setBill("")
        }
    };
    const handleExpensesValue = (e) => {
        if(isNumber(e.target.value)){
            message.expensesMessage && setMessage({...message, expensesMessage: ""});
            setUserExpense(Number(e.target.value) > bill ?
                userExpense : Number(e.target.value))
        }else{
            setMessage({...message, expensesMessage: "Please enter number"});
            setUserExpense("")
        }
        if (Number(e.target.value) > bill)setMessage({...message, expensesMessage: "Your expense couldn't be more than Bill value!"});
        if (!bill)setMessage({...message, expensesMessage: "Please fill the Bill value first!"});
    };

    return (
        <form className="form-split-bill" onSubmit={handleSubmit} action="src/components">
            <h2>Split a bill with <span className={styles.name}>{selectedFriend?.name}</span></h2>
            <div className={styles.row}>
                <label htmlFor="">💰 Bill value</label>
                <input disabled={!selectedFriend?.name} type="text" value={bill} onChange={handleBillValue}/>
                { message.billMessage && <span className={styles.message}>{message.billMessage}</span>}
            </div>
            <div className={styles.row}>
                <label htmlFor="">🧍🏼‍♂️ Your expense</label>
                <input disabled={!selectedFriend?.name} type="text" value={userExpense}
                       onChange={handleExpensesValue}/>
                { message.expensesMessage && <span className={styles.message}>{message.expensesMessage}</span>}
            </div>
            <div className={styles.row}>
            <label htmlFor="">👫 {selectedFriend?.name} expense</label>
            <input type="text" disabled value={friendExpense}/>
            </div>
            <div className={styles.row}>
            <label htmlFor="">🤑 Who is paying the bill</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)} name="" id="">
                <option value="user">You</option>
                <option value="friend">{selectedFriend?.name}</option>
            </select>
            </div>
            <div className={`${styles.row} ${styles.lastItem}`}>
                <Button>Split bill</Button>
                {message.mainMessage && <span className={styles.message}>{message.mainMessage}</span>}

            </div>
        </form>

    );
}

export default FormSplitBill