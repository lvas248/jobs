
function Filter({filterText, updateFilterText, selectedCategory, updateSelectedCategory}){

    const categories = [{name: 'Title', value: 'business_title'}, {name: "Category", value: "job_category" }, {name: 'Job ID', value: 'job_id'}]

    const renderOptions = categories.map( c =>{
        return <option key={c.name} value={c.value}>{c.name}</option>
    })


    return ( 
        <div id='filter' className='h-fit flex flex-row gap-3 items-center'>

            <select
                className='text-sm w-max max-w-[20vw] h-8'
                value={selectedCategory}
                onChange={updateSelectedCategory}
            >
                {renderOptions}
            </select>
            
            <input className='w-[40vw] max-w-[40vw] h-8' type='text' placeholder='Search' value={filterText} onChange={updateFilterText} />
            
        </div>
     );
}

export default Filter;