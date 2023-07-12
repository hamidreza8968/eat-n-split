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

    const [friends , setFriends] = useState([]);
    const [name , setName] = useState("");
    const [image , setImage] = useState("");

    function handleAddFriend(friend){
        setFriends(friends => [...friends , friend]);
        setShowAddFriend(false);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList friends={friends}/>
                {showAddFriend && <FormAddFriend friends={friends} onAddFriend={handleAddFriend} name={name} onSetName={setName} image={image} onSetImage={setImage}/>}
                <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
            </div>
            <FormSplitBill/>
        </div>
    );
}

function FriendsList({friends}) {

  return (
      <ul>
        {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
      </ul>
  );
}

function Friend({friend}) {
  return (
      <li>
        <img src={friend.image} alt={friend.name}/>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
        {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button>Select</Button>
      </li>
  );
}

function FormAddFriend({onAddFriend , name , onSetName, image , onSetImage}) {
    function handleSubmit(e) {
        e.preventDefault();

        if(!name || !image) return;

        const newFriend = {
            name,
            image,
            balance:0,
            id: crypto.randomUUID(),
        };

        onAddFriend(newFriend);

       onSetName("");
       onSetImage("");
    }

  return (
      <form className="form-add-friend" action="" onSubmit={handleSubmit}>
        <label htmlFor="">👫 Friend name</label>
        <input value={name} onChange={(e) => onSetName(e.target.value)} type="text"/>

        <label htmlFor="">🌅 Image URL</label>
        <input value={image} onChange={(e) => onSetImage(e.target.value)} type="text"/>

        <Button>Add</Button>
      </form>
  )

}

function FormSplitBill() {
  return (
      <form className="form-split-bill" action="">
        <h2>Split a bill with X</h2>
        <label htmlFor="">💰 Bill value</label>
        <input type="text"/>
        <label htmlFor="">🧍🏼‍♂️ Your expense</label>
        <input type="text"/>
        <label htmlFor="">👫 X expense</label>
        <input type="text" disabled/>
        <label htmlFor="">🤑 Who is paying the bill</label>
        <select name="" id="">
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>
      </form>

  );
}

function Button({children , onClick}) {
  return (
      <button onClick={onClick} className="button">{children}</button>
  );
}

export default App;
