import { Comment } from "../models/Models";

const AddComment = ({ onAdd }: any) => {
    
    const handleOnSubmit = (e: any) => {

        e.preventDefault();

        let id = e.target.id.value;
        let comment = e.target.body.value;
        let userId = e.target.userId.value;

        if (e.target.id.value && e.target.body.value && e.target.userId.value) {
            
            onAdd(Number(id), comment, userId);

            e.target.id.value = "";
            e.target.body.value = "";
            e.target.userId.value = "";

        } else {
            alert('Please fill all fields!')
        }
      
        
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