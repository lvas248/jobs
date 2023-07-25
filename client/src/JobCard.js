import { useState } from 'react'
import { useHistory } from 'react-router-dom' 

function JobCard({job, formatDate}) {
    
    const [ click, setClick] = useState(false)
    const history = useHistory()



    function navigateToDetailedCard(){
        history.push(`/jobs/${job.job_id}`)
    }
    
    return ( 
        <div 
            onClick={navigateToDetailedCard}
            className='border p-3 hover:cursor-pointer'>
            <h1 className='text-xl font-bold'>{job.business_title}</h1>
            <p>Posted on: {formatDate(job.posting_date)}</p>
            <p className='text-sm'>Salary Range: ${job.salary_range_from} to ${job.salary_range_to}</p>
            {
                click ? (
                    <div>
                        <label>Job Description</label>
                        <p className='text-xs'>{job.job_description}</p>
                    </div>
                ) : null
            }
           
        </div> 
        );
}

export default JobCard;