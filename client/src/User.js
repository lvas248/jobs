import { useSelector } from "react-redux";
import SavedJobCard from "./SavedJobCard";
import { useState } from 'react'
import Filter from "./Filter";

function User() {

    const [ filterText, setFilterText ] = useState('')
    const [ selectedCategory, setSelectedCategory ] = useState('business_title')
    const [ page, setPage ] = useState(1)
    const [ appliedFilter, setAppliedFilter ] = useState(false)

    let savedJobs = useSelector( state => state.savedJob.entity)
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
        <div>
    
            <p className='text-sm mb-2 float-right font-bold'>Email Address: {user.entity.email}</p>
                
            <div>
                <h1 className='text-xl underline font-bold'>Saved Jobs</h1>
                <div className='flex items-center'>
                    <Filter filterText={filterText} updateFilterText={updateFilterText} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}/>
                    <div className='flex ml-2'>
                        <p>Applied</p>
                        <input value={appliedFilter} onChange={()=>setAppliedFilter(!appliedFilter)}className='w-fit m-1' type='checkbox'/>
                    </div>
                </div>
                <div className='h-[78vh] overflow-auto'>
                    {renderSavedJobs.length > 0 ? renderSavedJobs : 'No saved jobs' }
                </div>
            </div>

        </div>  
    );
}

export default User;