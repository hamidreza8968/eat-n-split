import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

function App() {
    const [showAddFriend, setShowAddFriend] = useState(false);

    function handleShowAddFriend() {
        setShowAddFriend((show) => !show);
    }

    const [friends, setFriends] = useState(initialFriends);

    function handleAddFriend(friend) {
        setFriends(friends => [...friends, friend]);
        setShowAddFriend(false);
    }

    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleSelection(friend) {
        // setSelectedFriend(friend);
        setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
        setShowAddFriend(false);
    }

    function handleSplitBill(value) {

        setFriends(friends => friends.map(friend => friend.id === selectedFriend?.id ? {
            ...friend,
            balance: friend.balance + value
        } : friend));

        setSelectedFriend(null);

    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList friends={friends} selectedFriend={selectedFriend} onSelectFriend={handleSelection}/>
                {showAddFriend && <FormAddFriend friends={friends} onAddFriend={handleAddFriend}/>}
                <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
            </div>
            {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
        </div>
    );
}

function FriendsList({friends, selectedFriend, onSelectFriend}) {

    return (
        <ul>
            {friends.map(friend => <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend}
                                           onSelectFriend={onSelectFriend}/>)}
        </ul>
    );
}

function Friend({friend, selectedFriend, onSelectFriend}) {

    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
            {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button onClick={() => onSelectFriend(friend)}>{isSelected ? "Close" : "Select"}</Button>
        </li>
    );
}

function FormAddFriend({onAddFriend}) {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) return;

        const newFriend = {
            name,
            id: crypto.randomUUID(),
            image,
            balance: 0,
        };

        onAddFriend(newFriend);

        setName("");
        setImage("");
    }

    return (
        <form className="form-add-friend" action="" onSubmit={handleSubmit}>
            <label htmlFor="">👫 Friend name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>

            <label htmlFor="">🌅 Image URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text"/>

            <Button>Add</Button>
        </form>
    )

}

function FormSplitBill({selectedFriend, onSplitBill}) {

    function handleSubmit(e) {
        e.preventDefault();
        if (!bill || !userExpense) return;
        onSplitBill(whoIsPaying === "user" ? friendExpense : -userExpense);
    }

    const [bill, setBill] = useState("");
    const [userExpense, setUserExpense] = useState("");
    const friendExpense = bill ? bill - userExpense : "";
    const [whoIsPaying, setWhoIsPaying] = useState("user");


    return (
        <form className="form-split-bill" onSubmit={handleSubmit} action="">
            <h2>Split a bill with {selectedFriend.name}</h2>
            <label htmlFor="">💰 Bill value</label>
            <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>
            <label htmlFor="">🧍🏼‍♂️ Your expense</label>
            <input type="text" value={userExpense}
                   onChange={(e) => setUserExpense(Number(e.target.value) > bill ? userExpense : Number(e.target.value))}/>
            <label htmlFor="">👫 {selectedFriend.name} expense</label>
            <input type="text" disabled value={friendExpense}/>
            <label htmlFor="">🤑 Who is paying the bill</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)} name="" id="">
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>
            <Button>Split bill</Button>
        </form>

    );
}

function Button({children, onClick}) {
    return (
        <button onClick={onClick} className="button">{children}</button>
    );
}

export default App;
