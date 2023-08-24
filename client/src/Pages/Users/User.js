import { useSelector } from "react-redux";
import SavedJobCard from "./SavedJobCard";
import { useState } from 'react'
import Filter from "../../Components/Filter";
import LoadingIcon from "../../Components/LoadingIcon";

function User() {

    const [ filterText, setFilterText ] = useState('')
    const [ selectedCategory, setSelectedCategory ] = useState('business_title')
    const [ page, setPage ] = useState(1)
    const [ appliedFilter, setAppliedFilter ] = useState(false)

    let savedJobs = useSelector( state => state.savedJob.entity)
    const savedJobStatus = useSelector( state => state.savedJob.status)
    const user = useSelector( state => state.user)

    function updateFilterText(e){
        setFilterText(e.target.value)
        if(page !== 1) setPage(1)
    }

    function updateSelectedCategory(e){
        setSelectedCategory(e.target.value)
    }

    savedJobs = savedJobs?.filter( j => {
        if( appliedFilter ) return j.applied === appliedFilter
        else return j
    })

    const filteredJobs = savedJobs?.filter( j => {
        if(selectedCategory){
             return j[selectedCategory].toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) 
        } 
        return false
    } )

    const renderSavedJobs = filteredJobs?.map( j =>{
        return <SavedJobCard key={j.id} job={j} />
    })



    return ( 
        <div className='animate-fade-in pt-[10vh] h-[60vh] grid'>

            <LoadingIcon status={savedJobStatus}/>
    
            <p className='text-xs sm:text-sm mb-2 text-right font-bold mr-6'>Email Address: {user.entity.email}</p>
                
            <div className='px-[4vh]'>
                <h1 className='text-sm sm:text-xl underline font-bold'>Saved Jobs</h1>
                
                <div className='flex items-center border-b-2 place-self-center'>
                    <Filter filterText={filterText} updateFilterText={updateFilterText} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}/>
                    <div className='flex ml-2 text-sm'>
                        <p>Applied</p>
                        <input value={appliedFilter} onChange={()=>setAppliedFilter(!appliedFilter)}className='w-fit m-1' type='checkbox'/>
                    </div>
                </div>

                <div className='h-[70vh] flex flex-wrap justify-center gap-3 pt-3 overflow-auto'>
                    {renderSavedJobs.length > 0 ? renderSavedJobs : 'No saved jobs' }
                </div>
            </div>

        </div>  
    );
}

export default User;