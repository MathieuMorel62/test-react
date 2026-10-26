function Login(){
    return(
        <div className="Login flex min-h-[70vh] flex-col items-start gap-2 border-t-2 border-[var(--main-color)] p-3 min-[520px]:p-5">
            <p>Login to access the full dashboard</p>
            <label htmlFor="email" onClick={() => document.getElementById('email').focus()}>email:</label>
            <input className="w-full max-w-sm border border-gray-400 px-2 py-1 min-[520px]:w-auto" type="text" id="email" name="email" />
            <label htmlFor="password" onClick={() => document.getElementById('password').focus()}>password:</label>
            <input className="w-full max-w-sm border border-gray-400 px-2 py-1 min-[520px]:w-auto" type="text" id="password" name="password" />
            <button className="rounded border border-gray-400 px-3 py-1">OK</button>
        </div>
    )
}
export default Login;