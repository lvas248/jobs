import JobCard from "../Jobs/JobCard";
import { useState } from 'react'
import { deleteSavedJob, updateSavedJob } from "../../Redux/slices/savedJobSlice";
import { useDispatch } from 'react-redux'

function SavedJobCard({ job }) {

    const [ removeClick, setRemoveClick ] = useState(false)
    const [ appliedClick, setAppliedClick ] = useState(false)

    const dispatch = useDispatch()

    function switchRemove(){
        setRemoveClick(!removeClick)
    }

    function switchApplied(){
        setAppliedClick(!appliedClick)
    }

    function removeJobPost(){
        dispatch(deleteSavedJob(job.id)).then(res => {
            if(res.meta.requestStatus ==='fulfilled') switchRemove()
        })
    }

    function markApplied(){
        dispatch(updateSavedJob(job.id)).then(res => {
            if(res.meta.requestStatus ==='fulfilled') switchApplied()
        })
    }

    return ( 
        <div key={job.id} className={`relative mt-2 group min-h-max ${ job.applied && 'bg-green-100'}` } >

            <div className={`col-span-9 ${ (removeClick || appliedClick) && 'hidden'}`}>
                
                <JobCard job={job} />

                <div className='group-hover:flex absolute bottom-0 right-2'>

                    <button onClick={switchApplied} className={`mt-0 peer/apply border-none text-lg font-bold`}>A</button>
                    <button onClick={switchRemove} className={`mt-0 peer/remove border-none font-bold text-lg`}>𝐗</button> 
                    
                    <div className='absolute -top-1 text-red-600 right-0 w-max text-xs invisible sm:peer-hover/remove:visible'>remove job</div>
                    <div className={`absolute -top-1 right-5 w-max text-xs m-auto invisible sm:peer-hover/apply:visible text-green-600 ${ job?.applied && 'text-red-600'}`}>{job?.applied ? 'remove applied' : 'mark as applied' }</div>

                </div>

            </div>

            <div className={`col-span-9 text-sm p-2 ${!removeClick && 'hidden' }`}>
                <label className='w-max'>Are you sure you want to remove this post?</label>
                <div>
                    <button onClick={removeJobPost}>Remove</button>
                    <button onClick={switchRemove}>Cancel</button>
                </div>
            </div>

            <div className={`col-span-9 p-2 text-sm ${!appliedClick && 'hidden' }`}>
                <label>{ job.applied ? 'Do you want to remove the "applied" flag from this job post?' : 'Would you like to flag this job post as "applied"?'}</label>
                <div>
                    <button onClick={markApplied}>Yes!</button>
                    <button onClick={switchApplied}>Cancel</button>
                </div>
            </div>

        </div>
        
    );
}

export default SavedJobCard;