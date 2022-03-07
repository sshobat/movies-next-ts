import { Comment } from "../models/Models";
import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import { useEffect, useState } from "react";
import EditComment from './EditComment';

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

    const [displayComment, setDisplayComment] = useState(comment?.body);
    const [username, setUsername] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/users?id=${comment?.userId}`)
        .then(response => response.json())
        .then(data => setUsername(data[0]?.username))
    }, [displayComment]);

    const handleDeleteClick = async () => {
        await fetch(`http://localhost:4000/comments/${comment?.id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.status !== 200) {
                return;
            }
            setComments(comments?.filter(item => item.id != comment?.id))
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const PostCommentChange = async (
        body: string,
        ) => {
        await fetch(`http://localhost:4000/comments/${comment.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            body: body,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((res) => {
            if (res.status !== 201) {
                return;
            } else {
                return res.json();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleEditClick = () => {
        !isEdit ? setIsEdit(true) : setIsEdit(false);
    }

    return (
        <>
            <li>
                {displayComment}
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
                        onClick={() => handleEditClick()}
                    >
                        Edit comment
                    </button>
                </div>
                {isEdit && 
                <EditComment 
                    setIsEdit={setIsEdit}
                    setDisplayComment={setDisplayComment}
                    comment={comment.body}
                    PostCommentChange={PostCommentChange}
                    displayComment={displayComment}
                />}
            </li>
        </>
    );
};

export default OneComment;