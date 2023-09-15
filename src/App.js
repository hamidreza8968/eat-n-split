import {useState} from "react";
import FormAddFriend from "./components/formAddFriend/formAddFriends";
import FormSplitBill from "./components/formSplitBill/formSplitBill";
import initialFriends from "./data/friendList.json";
import FriendsList from "./components/friendList/friendsList";

function App() {
    const firstFrined = initialFriends[0]

    const [friends, setFriends] = useState(initialFriends);

    function handleAddFriend(friend) {
        setFriends(friends => [...friends, friend]);
    }

    const [selectedFriend, setSelectedFriend] = useState(firstFrined);

    function handleSelection(friend) {
        setSelectedFriend((cur) => cur?.id === friend.id ? null : friend);
    }

    function handleSplitBill(value) {
        setFriends(friends => friends.map(friend => friend.id === selectedFriend?.id ? {
            ...friend,
            balance: friend.balance + value
        } : friend));

    }


    return (
        <>

            <div>
                <div className="app">
                    <div>
                        <h1 className="title">BillShare Pro</h1>
                        <h2 className="sub-title">The hassle-free way to split bills with friends.</h2>
                    </div>
                    <div className="sidebar">
                        <FriendsList friends={friends} selectedFriend={selectedFriend} onSelectFriend={handleSelection}/>
                    </div>
                    <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>
                </div>
                <FormAddFriend friends={friends} onAddFriend={handleAddFriend}/>
            </div>
        </>
    );
}




export default App;
