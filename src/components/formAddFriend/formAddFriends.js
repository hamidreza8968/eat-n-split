import {useState} from "react";
import Button from "../Button/button";
import styles from "./formAddFriends.module.css"

function FormAddFriend({onAddFriend}) {

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!name) setMessage("Please fill your friend's name")
        else {
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
    }

    return (
        <form className="form-add-friend" action="src/components" onSubmit={handleSubmit}>
            <h2>
                Add your other friends
            </h2>
            <label htmlFor="">👫 Friend name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>

            <label htmlFor="">🌅 Image URL</label>
            <input value={image} onChange={(e) => setImage(e.target.value)} type="text"/>

            <Button>Add</Button>
            {message && <div className={styles.message}>{message}</div>}
        </form>
    )

}

export default FormAddFriend