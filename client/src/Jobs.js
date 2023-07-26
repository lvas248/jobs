import JobCard from "./JobCard";
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import DetailedJobCard from "./DetailedJobcard";
import Filter from "./Filter";
import { useState } from "react";

function Jobs() {

    const [ filterText, setFilterText ] = useState('')

 
    const jobs = useSelector(state => state.job.entity)
 
    function formatDate(dateTimeString){
        const dateObj = new Date(dateTimeString)
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const day = dateObj.getDate();
        const year = dateObj.getFullYear()
        return `${month} ${day}, ${year}`

    }
    
    const renderJobCards = jobs?.map( j =>{
        return <JobCard key={uuidv4()} formatDate={formatDate} job={j} />
    })

    
    
    return ( 

        <Switch>

            <Route exact path='/jobs'>
                <Filter filterText={filterText} setFilterText={setFilterText}/>
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