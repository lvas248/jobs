


function LoadingIcon({status}) {
    
    return ( 
        <div className={`${status !== 'pending' && 'invisible'} flex gap-3 z-30 bg-slate-100 w-max fixed top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] p-3 rounded-full`}>
            <div className='h-4 w-4 bg-slate-600 animate-spin'>
            </div>
            <p className='text-xs'>loading...</p>
        </div>
    );
}

export default LoadingIcon;