function Signup() {

    return ( 
        <form
            className='
                form
                
                '
        >
            <input type='email' name='email' placeholder='email'/>
            <input type='password' name='password' placeholder='password'/>
            <input type='password' name='password_confirmation' placeholder='password_confirmation'/>

            <button
                className='bg-slate-200'
            >sign up</button>
        </form>
     );
}

export default Signup;