import { useSelector } from "react-redux";
import JobCard from "./JobCard";

function User() {

    const savedJobs = useSelector( state => state.savedJob.entity)

    const renderSavedJobs = savedJobs?.map( j => {
        return <JobCard key={j.id} job={j} />
    })

    console.log(savedJobs)

    return ( 
    <div>
        <h1>Saved Jobs</h1>

        { renderSavedJobs }
    </div>  
    );
}

export default User;