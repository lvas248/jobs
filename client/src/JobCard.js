import { useHistory } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import { saveJob } from './features/user/savedJobSlice'

function JobCard({job}) {
    
    const dispatch = useDispatch()
    const history = useHistory()
    
    const loggedIn = useSelector( state => state.session.loggedIn)
    const savedJobs = useSelector( state => state.savedJob.entity)

    function replaceWierdText(string){

        if(!string) return ''

        const symbolsMap = {
            'â¢': '•',
            'â': "'",
          };
        
          // Replace the weird symbols with their appropriate counterparts
          let cleanedText = string;
          for (const [weirdSymbol, readableSymbol] of Object.entries(symbolsMap)) {
            cleanedText = cleanedText.split(weirdSymbol).join(readableSymbol);
          }
          return cleanedText
    }

    function formatDate(dateTimeString){
        const dateObj = new Date(dateTimeString)
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const day = dateObj.getDate();
        const year = dateObj.getFullYear()
        return `${month} ${day}, ${year}`

    }

    function navigateToDetailedCard(){
        history.push(`/job/${job.job_id}`)
    }

    function submitJobSave(){
        dispatch(saveJob(job))
    }

    const saved = savedJobs?.find( j => j.job_id === job.job_id)

       return ( 
            <div 

                className={`border p-2 hover:cursor-pointer relative flex flex-row  hover:border-yellow-300  hover:border-1 shadow hover:bg-slate-100`}>
                
                <div onClick={navigateToDetailedCard} className='hover:cursor-pointer w-[90%]'>

                    <h1 className='sm:text-xl font-bold'>{job.civil_service_title}</h1>
                    <p className='font-semibold text-slate-600'>{replaceWierdText(job.business_title)}</p>
                    <p className='text-xs sm:text-sm'>Posted on: {formatDate(job.posting_date)}</p>
                    <p className='text-xs sm:text-sm'>Salary Range: ${job.salary_range_from} to ${job.salary_range_to}</p>
            
                </div>

                <div className='w-[10%] align-middle p-none pr-1 text-right'>

                    { saved ? (
                        <p className='text-xs text-green-600'>saved</p>
                    ) : (
                        <button onClick={submitJobSave} className={`border-none pt-none rounded-full mt-0 hover:bg-white ${!loggedIn && 'hidden'}`}>➕</button>
                    ) }
                </div>


            </div> 
        );
}

export default JobCard;