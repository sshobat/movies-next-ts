import { Comment } from "../models/Models";
import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import { useEffect, useState } from "react";

interface Props {
    comment: Comment,
    comments: Comment[],
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

const OneComment = ({
    comment, 
    comments, 
    setComments
}: Props) => {

    const [username, setUsername] = useState('');
    
    useEffect(() => {
        fetch(`http://localhost:4000/users?id=${comment.userId}`)
        .then(response => response.json())
        .then(data => setUsername(data[0].username))
    }, []);


    const handleDeleteClick = async () => {
        await fetch(`http://localhost:4000/comments/${comment.id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.status !== 200) {
                return;
            }
            setComments(comments?.filter(item => item.id != comment.id))
        })
        .catch((err) => {
            console.log(err);
          });
    };

    return (
        <>
            <li>
                {comment.body}
                <br />
                <p style={{display:'inline'}}>Author:</p>
                {username}
                <div className="buttons">
                    <button
                        onClick={() => handleDeleteClick()}
                    >
                        Delete comment
                    </button>
                    <button
                        onClick={() => Window.openDialog()}
                    >
                        Edit comment
                    </button>
                </div>
            </li>
        </>
    );
};

export default OneComment;