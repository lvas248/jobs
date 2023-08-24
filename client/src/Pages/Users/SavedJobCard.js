import JobCard from "../Jobs/JobCard";
import { useState } from 'react'
import { deleteSavedJob, updateSavedJob } from "../../Redux/slices/savedJobSlice";
import { useDispatch } from 'react-redux'

function SavedJobCard({ job }){

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
        <div key={job.id} className={`relative group`} >

            
            
            <div className={`flex w-fit ${job.applied ? 'bg-green-200':'bg-slate-200' } rounded-3xl`}>
                

                <JobCard job={job} />


                <div className={`grid grid-cols-1 place-content-center`}>

                    <button 
                        onClick={switchApplied} 
                        className={`
                            place-self-stretch
                            
                            mt-0 peer/apply border-none font-bold text-xs   
                            ${ (removeClick || appliedClick) && 'hidden'}
                        `}>
                            Mark Applied
                    </button>
                    
                    <button 
                        onClick={switchRemove} 
                        className={`
                            place-self-stretch
                            mt-0 peer/remove border-none font-bold text-xs 
                            ${ (removeClick || appliedClick) && 'hidden'}
                        `}>
                            Remove
                    </button> 

                </div>

                <div className={`grid grid-cols-1 place-content-center`}>

                    <div className={`text-xs p-2 max-w-[300px] font-bold ${!removeClick && 'hidden' }`}>
                        <label className='font-semibold'>Remove this post?</label>
                        <div>
                            <button onClick={removeJobPost}>Yes</button>
                            <button onClick={switchRemove}>Cancel</button>
                        </div>
                    </div>

                    <div className={`p-2 text-xs max-w-[150px] font-bold ${!appliedClick && 'hidden' }`}>
                        <label>{ job.applied ? 'Remove "applied" flag from this job post?' : 'Flag as "applied"?'}</label>
                        <div>
                            <button onClick={markApplied}>Yes!</button>
                            <button onClick={switchApplied}>Cancel</button>
                        </div>
                    </div>

                </div>

            </div>


        </div>
        
    );
}

export default SavedJobCard;