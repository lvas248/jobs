import JobCard from "./JobCard";
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import DetailedJobCard from "./DetailedJobcard";


function Jobs() {

    const jobs = useSelector(state => state.job.entity)
    
    const sortedJobs = [...jobs].sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date))
    console.log(sortedJobs)
 
    function formatDate(dateTimeString){
        const dateObj = new Date(dateTimeString)
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const day = dateObj.getDate();
        const year = dateObj.getFullYear()
        return `${month} ${day}, ${year}`

    }
    
    const renderJobCards = sortedJobs?.map( j =>{
        return <JobCard key={uuidv4()} formatDate={formatDate} job={j} />
    })
    
    return ( 

        <Switch>

            <Route exact path='/jobs'>
                <div>
                    { renderJobCards }
                </div>  
            </Route>

            <Route path='/jobs/:job_id'>
                <DetailedJobCard formatDate={formatDate}/>
            </Route>

        </Switch>

 

        );
}

export default Jobs;