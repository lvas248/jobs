import { useSelector } from "react-redux";

function User() {

    const state = useSelector( state => state.session)
    const user = useSelector( state => state.user)

    console.log(state, user)
    return ( 
    <div>
        'Success'
    </div>  );
}

export default User;