import JobCard from "./JobCard";
import { useState } from 'react'
import { deleteSavedJob } from "./features/user/savedJobSlice";
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
        dispatch(deleteSavedJob(job.id))
    }

    return ( 
        <div key={job.id} className='relative mt-2 group min-h-max' >

            <div className={`col-span-9 ${ removeClick && 'hidden'}`}>
                <JobCard job={job} />

                <div className='hidden group-hover:flex flex-col absolute top-0 right-2  '>
                    <button onClick={switchRemove} className='mt-0 border-none'>𝐗</button>
                    <button onClick={switchApplied} className='mt-0 border-none'>✔</button>
                </div>

            </div>

            <div className={`col-span-9 p-2 ${!removeClick && 'hidden' }`}>
                <label>Are you sure you want to remove this post?</label>
                <button onClick={removeJobPost}>Remove</button>
                <button onClick={switchRemove}>Cancel</button>
            </div>

        </div>
        
    );
}

export default SavedJobCard;