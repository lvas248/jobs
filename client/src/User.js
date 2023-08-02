import { useSelector } from "react-redux";
import SavedJobCard from "./SavedJobCard";

function User() {


    const savedJobs = useSelector( state => state.savedJob.entity)
    const user = useSelector( state => state.user)

    const renderSavedJobs = savedJobs?.map( j =>{
        return <SavedJobCard key={j.id} job={j} />
    })

    return ( 
        <div>
            <div>
                <h1 className='text-xl'>User Details:</h1>

                <div className='flex gap-4 p-4'>
                    <p>Email Address: <strong>{user.entity.email}</strong></p>
                </div>

 
            </div>

            <div>
                <h1 className='text-xl'>My Saved Jobs</h1>
                {renderSavedJobs}
            </div>

        </div>  
    );
}

export default User;