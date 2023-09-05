import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import JobCard from './JobCard'
import { v4 as uuidv4 } from 'uuid'
import Filter from '../../Components/Filter'

function JobsList() {

    const [ filterText, setFilterText ] = useState('')
    const [ selectedCategory, setSelectedCategory ] = useState('business_title')
    const [ page, setPage ] = useState(1)

    const containerRef = useRef()
    const loggedIn = useSelector(state => state.session.loggedIn)

    function updateFilterText(e){
        setFilterText(e.target.value)
        if(page !== 1) setPage(1)
    }

    function updateSelectedCategory(e){
        setSelectedCategory(e.target.value)
    }

    let jobs = useSelector(state => state.job.entity)

    jobs = jobs.filter( j => {
        if(selectedCategory){
             return j[selectedCategory].toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) 
        } 
        return false
    } )
 
    function scrollToTop(){
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top:0,
            behavior: 'smooth'
          })
        }
      }

    function incrementPage(){
        if(jobs.length/50 - 1   > page){
            setPage(parseInt(page) + 1)
            scrollToTop()
        }
    }

    function decrementPage(){
        if( page > 1){ 
            setPage(parseInt(page) - 1)
            scrollToTop()
            }
    }

    const indexFrom = page === 1 ? 0 : page * 50
    const indexTo = (page+1) * 50

    const renderJobCards = jobs?.slice(indexFrom,indexTo).map( j =>{
        return <JobCard key={uuidv4()}  job={j} />
    })

    return ( 
        <div id='jobsList'
            className='animate-fade-in pt-[8vh] px-4 relative'
        > 
            <div className=''>

                <Filter filterText={filterText} updateFilterText={updateFilterText} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}/>

                <div id='top' className='pb-2 border-b-2 grid grid-cols-2'>
                    <p className='text-xs text-blue-600'>Results: {jobs?.length} jobs</p>
                { !loggedIn && <p className="text-xs text-red-500 text-right">Log in to save jobs</p>}
                </div>    

             </div>


            <div ref={containerRef} className='overflow-auto relative h-[55vh] sm:h-[68vh] pt-4 flex flex-wrap gap-4 justify-center'>
                { renderJobCards }
            </div>  

            <div className='flex items-center m-auto max-w-[200px]'>
                <button className='m-auto p-2' onClick={decrementPage}>-</button>
                <input className='w-[10vw] text-center' value={page} onChange={(e)=>setPage(e.target.value)}/>
                <button className='m-auto p-2' onClick={incrementPage}>+</button>
            </div>

        </div> 
    );
}

export default JobsList;