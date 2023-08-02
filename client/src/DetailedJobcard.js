import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function DetailedJobCard(){

    const { job_id } = useParams()
    const jobs = useSelector( state => state.job?.entity)
    const job = jobs?.find( j => j.job_id === job_id)

    function makeTextReadable(text) {
        if (!text) return '';

        const cleanedText = replaceWierdText(text)
      
        // Split the cleanedText into an array of substrings using the bullet point symbol ('•') as the separator
        const parts = cleanedText?.split('•');
      
        // If the first part is empty (i.e., the cleanedText started with a bullet point), remove it
        if (parts.length > 0 && parts[0].trim() === '') {
          parts.shift();
        }
      
        return parts.map((l, index) => {
          // Add line breaks before each subsequent bullet point
          if (index > 0) {
            return <li className='text-sm m-2' key={l}>{l}</li>;
          }
          return <span className='text-sm m-2' key={l}>{l}</span>; // First string without bullet point
        });
      }

    function formateNumberedText(string) {
        const sentences = string?.split(/ (?=\d+\.)/);
        const sanitizedSentences = sentences?.map((s) => {
          // Replace weird symbols with a space (modify the regex as needed)
          const sanitizedSentence = s.replace(/[^\w\s.,?!]/g, ' ');
          return <li className='mt-2 text-sm' key={s}>{sanitizedSentence}</li>;
        });
        return sanitizedSentences;
      }
      
    function formatDate(dateTimeString){
        const dateObj = new Date(dateTimeString)
        const month = dateObj.toLocaleString('default', {month: 'long'})
        const day = dateObj.getDate();
        const year = dateObj.getFullYear()
        return `${month} ${day}, ${year}`

    }

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
    const expired = new Date(job?.post_until) < new Date()



    return ( 
        <div className='py-8'>

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
                    {formateNumberedText(job?.minimum_qual_requirements)}
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
                    { formateNumberedText(job?.additional_information)}
                    </ul>
                    {/* <p className='text-sm'>{job?.additional_information}</p> */}
                </div>

            </div>

            {/* <div className='mt-8'>
                <p className='font-bold text-lg'>Apply</p>

                <div className='p-2'>
                    <p className='text-sm'>{job?.to_apply}</p>
                </div>

            </div> */}

         

            <a className='border-2 rounded-full p-2 text-white bg-slate-400' href={`https://a127-jobs.nyc.gov/index_new.html?keyword=${job?.job_id}`}>Apply Here</a>
                
        

            
        </div> 
        );
}

export default DetailedJobCard;