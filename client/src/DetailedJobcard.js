import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function DetailedJobCard({formatDate}){

    const { job_id } = useParams()
    const jobs = useSelector( state => state.job?.entity)
    const job = jobs?.find( j => j.job_id === job_id)


    return ( 
        <div>

            <div className='grid grid-col sm:grid-cols-2 gap-1'>
                <p className='text-xs font-bold'>Job ID: {job?.job_id}</p>
                <p className='text-xs'>Posted on: {formatDate(job?.posting_date)}</p>
                <p className='text-xs'>Last updated: {formatDate(job?.posting_date)}</p>
                <p className='text-xs'>Available until: {formatDate(job?.post_until)}</p>
            </div>    

            <h1 className='text-2xl font-bold mt-4'>{job?.business_title}</h1>
            
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
                    <p className='text-sm'>{job?.job_description}</p>
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Minimum Qualifications:</p>

                <div className='p-2'>
                    <p className='text-sm'>{job?.minimum_qual_requirements}</p>
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Preferred Skills</p>

                <div className='p-2'>
                    <p className='text-sm'>{job?.preferred_skills}</p>
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Additional Info:</p>

                <div className='p-2'>
                    <p className='text-sm'>{job?.additional_information}</p>
                </div>

            </div>

            <div className='mt-8'>
                <p className='font-bold text-lg'>Apply</p>

                <div className='p-2'>
                    <p className='text-sm'>{job?.to_apply}</p>
                </div>

            </div>

            
        </div> 
        );
}

export default DetailedJobCard;