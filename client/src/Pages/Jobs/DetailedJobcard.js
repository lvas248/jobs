import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { formatDate, formatNumberedText, makeTextReadable, replaceWierdText } from '../../Helpers';

function DetailedJobCard(){

    const { job_id } = useParams()
    
    const jobs = useSelector( state => state.job?.entity)
    
    const job = jobs?.find( j => j.job_id === job_id)
   
    const expired = new Date(job?.post_until) < new Date()


    return ( 
        <div className='py-[12vh] px-[4vw] h-[84vh] sm:h-[95vh] overflow-y-auto'>

            <div className='grid grid-col sm:grid-cols-2 gap-1'>
                <p className='text-xs font-bold'>Job ID: {job?.job_id}</p>
                <p className='text-xs'>Posted on: {formatDate(job?.posting_date)}</p>
                <p className='text-xs'>Last updated: {formatDate(job?.posting_date)}</p>
                <div className='flex'>
                    <p className='text-sm'>Available until: { job?.post_until ? formatDate(job?.post_until) : 'POSITION FILLED'}</p>
                    { expired && <p className='text-xs ml-2 font-bold text-red-500 m-auto'>EXPIRED</p>}
                </div>
            </div>    

            <h1 className='text-2xl font-bold mt-4'>{replaceWierdText(job?.business_title)}</h1>
            
            <div className='mt-8'>
                <p className='font-bold text-lg'>Location</p>
                <p className='text-sm'>{job?.work_location}</p>
            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Category</p>
                <p className='text-sm'>{job?.job_category}</p>
            </div>

            <div className='mt-8'>

                <p className='font-bold text-lg'>Salary </p>

                <div className='flex flex-col gap-2 p-2'>
                    <div className='flex'>
                        <p className='text-sm'>Range: </p>
                        <p className='text-sm ml-2'>${job?.salary_range_from} to ${job?.salary_range_to}</p>                  
                    </div>
                    <div className='flex'>
                        <p className='text-sm'>Frequency: </p>
                        <p className='text-sm ml-2'>{job?.salary_frequency}</p>
                    </div>
                </div>


            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Description</p>

                <div className='p-2'>
                    {makeTextReadable(job?.job_description)}
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Residency Requirements</p>

                <div className='p-2'>
                    {makeTextReadable(job?.residency_requirement)}
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Minimum Qualifications:</p>

                <ul className='p-2'>
                    {formatNumberedText(job?.minimum_qual_requirements)}
                </ul>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Preferred Skills</p>

                <ul className='p-2'>
                    {makeTextReadable(job?.preferred_skills)}
                </ul>

            </div>

            <div className='my-8'>
                <p className='font-bold text-lg'>Additional Info:</p>

                <div className='p-2'>
                    <ul>
                    { formatNumberedText(job?.additional_information)}
                    </ul>
                </div>

            </div>

            <a className='border-2 rounded-full p-2 text-white bg-slate-400' href={`https://a127-jobs.nyc.gov/index_new.html?keyword=${job?.job_id}`}>Apply Here</a>
                
            
        </div> 
        );
}

export default DetailedJobCard;