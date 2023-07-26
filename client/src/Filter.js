
function Filter({filterText, updateFilterText, selectedCategory, updateSelectedCategory}){

    const categories = [{name: 'Title', value: 'business_title'}, {name: "Category", value: "job_category" }, {name: 'Job ID', value: 'job_id'}]

    const renderOptions = categories.map( c =>{
        return <option key={c.name} value={c.value}>{c.name}</option>
    })


    return ( 
        <div className='h-[8vh] flex flex-row z-10 gap-10'>
            <select
                value={selectedCategory}
                onChange={updateSelectedCategory}
            >
                {renderOptions}
            </select>
            <input className='w-[40vw]' type='text' placeholder='Search' value={filterText} onChange={updateFilterText} />
            
        </div>
     );
}

export default Filter;