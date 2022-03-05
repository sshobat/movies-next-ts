import { Comment } from "../models/Models";
import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import { useEffect, useState } from "react";

interface Props {
    comment: Comment,
}

const OneComment = ({comment}: Props) => {

    const [username, setUsername] = useState('');
 

    useEffect(() => {
        fetch(`http://localhost:4000/users?id=${comment.userId}`)
        .then(response => response.json())
        .then(data => setUsername(data[0].username))
    }, []);




    const handleDeleteClick = () => {
        fetch(`http://localhost:4000/comments/${comment.id}`, {
                method: 'DELETE'
            });
    }

    return (
        <>
            <li>
                {comment.body}
                <br />
                <p style={{display:'inline'}}>Author:</p>  {username}
                <div className="buttons"></div>
                <button
                    onClick={() => handleDeleteClick()}
                >
                    Delete comment
                </button>
            </li>
        </>
    );
};

export default OneComment;