function Login(){
    return(
        <div className="Login">
            <p>Login to access the full dashboard</p>
            <label htmlFor="email" onClick={() => document.getElementById('email').focus()}>email:</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password" onClick={() => document.getElementById('password').focus()}>password:</label>
            <input type="text" id="password" name="password" />
            <button>OK</button>
        </div>
    )
}
export default Login;