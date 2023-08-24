import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import DetailedJobCard from "./DetailedJobcard";
import LoadingIcon from "../../Components/LoadingIcon";
import JobsList from "./JobsList";

function Jobs() {

    const jobStatus = useSelector( state => state.job.status)


    return (  
        <div id='jobs' className=''>

            <LoadingIcon status={jobStatus} />

            <Switch>

                <Route path='/job/:job_id'>
                    <DetailedJobCard />
                </Route>

                <Route exact path='/'>
                    <JobsList />        
                </Route>

            </Switch>

        </div>


 

        );
}

export default Jobs;