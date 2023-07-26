
function Filter({filterText, setFilterText}){

    return ( 
        <div className='h-[8vh] flex'>
            <button> Sort by Date</button>
            <input className='w-[40vw]' type='text' placeholder='Search' value={filterText} onChange={(e)=>setFilterText(e.target.value)} />
            
        </div>
     );
}

export default Filter;