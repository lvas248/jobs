import { useSelector } from "react-redux";
import SavedJobCard from "./SavedJobCard";

function User() {


    const savedJobs = useSelector( state => state.savedJob.entity)


    const renderSavedJobs = savedJobs?.map( j =>{
        return <SavedJobCard key={j.id} job={j} />
    })

    return ( 
    <div>
        <h1>My Saved Jobs</h1>
        {renderSavedJobs}

    </div>  
    );
}

export default User;