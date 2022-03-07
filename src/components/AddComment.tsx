import { ChangeEvent, useEffect, useState } from "react";
import { Comment } from "../models/Models";

interface Props {
    onAdd: (body: string, userId: string) => void,
    startQuery: {
        movie_id: string,
    },
}

const AddComment = ({ 
    onAdd,
    startQuery,
}: Props) => {
    
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [username]);

    const fetchUsers = async() => {
        await fetch(`http://localhost:4000/users?username=${username}`)
        .then(res => res.json())
        .then(data => {
            setUserId(data[0]?.id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleOnSubmit = (e: any) => {

        e.preventDefault();
        
        if (!userId) {
            alert('There is no such username!');
            return;
        }
        
        const comment = e.target.body.value;
        const id = userId;
        
        if (!e.target.body.value || !e.target.userName.value) {
            alert('Please fill all fields!');
            return;
        }

        onAdd(comment, id);
        e.target.body.value = "";
        e.target.userName.value = "";
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value);
    }
    
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <h3>Add Comment</h3>
                <input 
                    type="text" 
                    placeholder="Comment" 
                    name="body" 
                />
                <input
                    onChange={e => handleUsernameChange(e)} 
                    type="text" 
                    placeholder="userName" 
                    name="userName" 
                />
                <button onSubmit={handleOnSubmit}>Add</button>
                <hr />
            </form>
        </div>
    );
};

export default AddComment;