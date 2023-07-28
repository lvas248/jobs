import JobCard from "./JobCard";
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import DetailedJobCard from "./DetailedJobcard";
import Filter from "./Filter";
import { useState } from "react";

function Jobs() {

    const [ filterText, setFilterText ] = useState('')
    const [ selectedCategory, setSelectedCategory ] = useState('business_title')
    const [ page, setPage ] = useState(1)

 
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
 

    function incrementPage(){
        if(jobs.length/50 - 1   > page){
            setPage(parseInt(page) + 1)
        }
    }

    function decrementPage(){
        if( page > 1){ 
            setPage(parseInt(page) - 1)
            }
    }



    const indexFrom = page === 1 ? 0 : page * 50
    const indexTo = (page+1) * 50

    const renderJobCards = jobs?.slice(indexFrom,indexTo).map( j =>{
        return <JobCard key={uuidv4()}  job={j} />
    })

    return ( 

        <Switch>

            <Route exact path='/jobs'>
            <Filter filterText={filterText} updateFilterText={updateFilterText} selectedCategory={selectedCategory} updateSelectedCategory={updateSelectedCategory}/>
            <p className='text-xs text-blue-600 pb-2 border-b-2'>Results: {jobs?.length} jobs</p>
                
                <div className='overflow-auto h-[70vh]'>
                        { renderJobCards }
                </div>  

                <div className='flex items-center'>
                    <button className='m-auto p-2' onClick={decrementPage}>-</button>
                    <input className='w-[10vw] text-center' value={page} onChange={(e)=>setPage(e.target.value)}/>
                    <button className='m-auto p-2' onClick={incrementPage}>+</button>

                </div>
 
            </Route>

            <Route path='/jobs/:job_id'>
                <DetailedJobCard />
            </Route>

        </Switch>

 

        );
}

export default Jobs;