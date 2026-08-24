function Login(){
    return(
    <div className="Login">
        <p>Login to access the full dashboard</p>
        <label htmlFor="email">email:</label>
        <input type="text" id="email" name="email"></input>
        <label htmlFor="password">password:</label>
        <input type="text" id="password" name="password"></input>
        <button>OK</button>
    </div>
    )
}
export default Login;