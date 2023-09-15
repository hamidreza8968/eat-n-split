import Friend from "../friend/friends";
function FriendsList({friends, selectedFriend, onSelectFriend}) {

    return (
        <ul>
            {friends.map(friend => <Friend friend={friend} key={friend.id} selectedFriend={selectedFriend}
                                           onSelectFriend={onSelectFriend}/>)}
        </ul>
    );
}
export default FriendsList;