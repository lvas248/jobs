import JobCard from "./JobCard";
import { useState } from 'react'

function SavedJobCard({ job }) {

    const [ remove, setRemove ] = useState(false)

    function switchRemove(){
        setRemove(!remove)
    }

    function removeJobPost(){
        console.log('removed')
    }

    return ( 
        <div key={job.id} className='relative mt-2 group min-h-max' >

            <div className={`col-span-9 ${ remove && 'hidden'}`}>
                <JobCard job={job} />
                <button onClick={switchRemove} className='absolute hidden top-0 right-2 mt-0 border-none group-hover:block'>X</button>
            </div>

            <div className={`col-span-9 p-2 ${!remove && 'hidden' }`}>
                <label>Are you sure?</label>
                <button onClick={removeJobPost}>Remove</button>
                <button onClick={switchRemove}>Cancel</button>
            </div>

        </div>
        
    );
}

export default SavedJobCard;