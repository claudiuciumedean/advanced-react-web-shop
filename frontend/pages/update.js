import  UpdateItem from "../components/UpdateItem";

const Update = props => {
    return ( 
        <div>
            <UpdateItem id={props.query.id} key={0}/>
        </div>
    );
}

export default Update;