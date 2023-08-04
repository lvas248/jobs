function Alert({text, display}) {

    return ( 
    
    <div className={`h-[25vh] w-[67vw] rounded-xl bg-slate-200 absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-[-25%] flex justify-center items-center p-2 animate-fade-in ${!display && 'hidden'}`}>
        <h1 className='h-fit text-sm text-center'>{text}</h1>
    </div> );
}

export default Alert;