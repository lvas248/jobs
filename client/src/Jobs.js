import JobCard from "./JobCard";
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import DetailedJobCard from "./DetailedJobcard";
import Filter from "./Filter";
import { useState, useRef } from "react";
import LoadingIcon from "./LoadingIcon";

function Jobs() {

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

    const jobStatus = useSelector( state => state.job.status)

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
        <div>

            <LoadingIcon status={jobStatus} />

            <Switch>

                <Route path='/job/:job_id'>
                    <DetailedJobCard />
                </Route>

                <Route exact path='/'>
                    <div className='animate-fade-in'>

                        <Filter filterText={filterText} updateFilterText={updateFilterText} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}/>
                    
                        <div id='top' className='pb-2 border-b-2 grid grid-cols-2'>
                            <p className='text-xs text-blue-600'>Results: {jobs?.length} jobs</p>
                        { !loggedIn && <p className="text-xs text-red-500 text-right">Log in to save jobs</p>}
                        </div>
                            
                        <div ref={containerRef} className='overflow-auto h-[55vh] sm:h-[70vh] p-1'>
                                { renderJobCards }
                        </div>  

                        <div className='flex items-center'>
                            <button className='m-auto p-2' onClick={decrementPage}>-</button>
                            <input className='w-[10vw] text-center' value={page} onChange={(e)=>setPage(e.target.value)}/>
                            <button className='m-auto p-2' onClick={incrementPage}>+</button>
                        </div>

                    </div>

        
                </Route>



            </Switch>

        </div>


 

        );
}

export default Jobs;