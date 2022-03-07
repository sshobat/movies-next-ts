import { ChangeEvent, useState } from "react";

interface Props {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setDisplayComment: React.Dispatch<React.SetStateAction<string>>,
    comment: string,
    PostCommentChange: (body: string) => void,
    displayComment: string,
}

const EditComment = ({
    setIsEdit, 
    setDisplayComment, 
    comment, 
    PostCommentChange,
    displayComment
}: Props) => {

    const [newComment, setNewComment] = useState('');

    const handleCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.currentTarget.value);
    }

    const handleUpdateClick = () => {
        PostCommentChange(newComment);
        setDisplayComment(newComment);
        setIsEdit(false);
    }
    
    return (
        <>
            <hr/>
            <button 
                onClick={() => setIsEdit(false)}>
                    Go Back
            </button>
            <h2>Edit comment</h2>
            <textarea 
                onChange={e => handleCommentInput(e)}
                defaultValue={displayComment}
            >
            </textarea>
            <br/>
            <button
                onClick={() => handleUpdateClick()}
            >
                Update
            </button>
            <hr/>
        </>
    );
};

export default EditComment;