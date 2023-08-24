import { useHistory } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { saveJob } from '../../Redux/slices/savedJobSlice'
import { formatDate, replaceWierdText } from '../../Helpers';


function JobCard({job}) {
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    const loggedIn = useSelector( state => state.session.loggedIn)
    const savedJobs = useSelector( state => state.savedJob.entity)

    function navigateToDetailedCard(){
        history.push(`/job/${job.job_id}`)
    }

    function submitJobSave(){
        dispatch(saveJob(job))
    }

    const saved = savedJobs?.find( j => j.job_id === job.job_id)

       return ( 
            <div 
                className={`
                    z-0
                    relative flex flex-row
                    border p-3 rounded-2xl shadow
                    h-[200px] w-[300px]
                    bg-slate-500    
                    hover:cursor-pointer hover:scale-105
                    sm:hover:border-yellow-300 sm:hover:border-1 sm:hover:bg-slate-400 
                    `}>
                
                <div onClick={navigateToDetailedCard} className='hover:cursor-pointer w-[90%]'>

                    <h1 className= 'text-gray-300 font-bold'>{job.civil_service_title}</h1>
                    <p className='font-bold text-white text-sm'>{replaceWierdText(job.business_title)}</p>
                    
                    <p className='text-[12px] text-yellow-400'>Salary: ${job.salary_range_from} to ${job.salary_range_to}</p>
                    
                    <p className='absolute bottom-0 right-4 text-[10px] text-white float-right'>Posted on: {formatDate(job.posting_date)}</p>
           
                </div>

                <div className='w-[10%] align-middle p-none pr-1 text-right '>

                    { saved ? (
                        <p className='text-xs text-green-400 font-bold absolute top-0 right-4 '>saved</p>
                    ) : (
                        <>
                            <button onClick={submitJobSave} className={`peer border-none pt-none rounded-full mt-0 hover:bg-white ${!loggedIn && 'hidden'}`}>➕</button>
                            <div className='absolute top-0 right-10 text-green-600  bg-white rounded-full font-bold w-max text-xs text-left p-1 hidden sm:peer-hover:block'>Add to my jobs</div>
                        </>
                    ) }
                </div>


            </div> 
        );
}

export default JobCard;