import { Comment } from "../models/Models";

const AddComment = ({ onAdd }: any) => {
    
    const handleOnSubmit = (e: any) => {

        e.preventDefault();

        onAdd(Number(e.target.id.value), e.target.body.value, e.target.userId.value);

        e.target.id.value = "";
        e.target.body.value = "";
        e.target.userId.value = "";
    };
    
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <h3>Add Comment</h3>
                <input type="number" placeholder="id" name="id" />
                <input type="text" placeholder="Comment" name="body" />
                <input type="text" placeholder="UserId" name="userId" />
                <button onSubmit={handleOnSubmit}>Add</button>
                <hr />
            </form>
        </div>
    );
};

export default AddComment;