import JobCard from "./JobCard";
import { useState } from 'react'
import { deleteSavedJob, updateSavedJob } from "./features/user/savedJobSlice";
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

                <div className='hidden group-hover:flex absolute bottom-0 right-2  '>
                    <button onClick={switchApplied} className={`mt-0 border-none text-lg font-bold`}>A</button>
                    <button onClick={switchRemove} className={`mt-0 border-none font-bold text-lg`}>𝐗</button> 
                </div>

            </div>

            <div className={`col-span-9 p-2 ${!removeClick && 'hidden' }`}>
                <label>Are you sure you want to remove this post?</label>
                <button onClick={removeJobPost}>Remove</button>
                <button onClick={switchRemove}>Cancel</button>
            </div>

            <div className={`col-span-9 p-2 ${!appliedClick && 'hidden' }`}>
                <label>{ job.applied ? 'Do you want to remove the "applied" flag from this job post?' : 'Would you like to flag this job post as "applied"?'}</label>
                <button onClick={markApplied}>Yes!</button>
                <button onClick={switchApplied}>Cancel</button>
            </div>

        </div>
        
    );
}

export default SavedJobCard;