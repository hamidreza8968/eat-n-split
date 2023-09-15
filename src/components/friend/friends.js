import Button from "../Button/button";

function Friend({friend, selectedFriend, onSelectFriend}) {
    const defaultImg = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&amp;f=y";
    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li className={isSelected ? "selected" : ""}>
            <img src={friend.image || defaultImg} alt={friend.name}/>
            <h3>{friend.name}</h3>
            {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>}
            {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)}$</p>}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
            <Button onClick={() => onSelectFriend(friend)}>{isSelected ? "UnSelect" : "Select"}</Button>
        </li>
    );
}
export default Friend;