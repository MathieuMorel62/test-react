import React, { Component, Fragment } from 'react';

class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: props.email ?? '',
            password: props.password ?? '',
            enableSubmit: false
        }
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        this.props.logIn(this.state.email, this.state.password)
    }

    handleChangeEmail = (event) => {
        this.setState({ email: event.target.value }, this.handleEnableSubmit)
    }

    handleChangePassword = (event) => {
        this.setState({ password: event.target.value }, this.handleEnableSubmit)
    }

    handleEnableSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = this.state.email.trim() !== ""
            && this.state.password.trim() !== ""
            && emailRegex.test(this.state.email)
            && this.state.password.length >= 8

        this.setState({ enableSubmit: isValid })
    }
    


    render(){
        return(
            <Fragment>
                <div className="Login flex min-h-[70vh] flex-col items-start gap-2 border-t-2 border-[var(--main-color)] p-3 min-[520px]:p-5">
                    <p>Login to access the full dashboard</p>
                    <form onSubmit={this.handleLoginSubmit}>
                        <label htmlFor="email">email:</label>
                        <input
                            type="text"
                            value={this.state.email}
                            id="email"
                            name="email"
                            onChange={this.handleChangeEmail}
                        />

                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            value={this.state.password}
                            id="password"
                            name="password"
                            onChange={this.handleChangePassword}
                        />

                        <input
                            type="submit"
                            value="OK"
                            disabled={!this.state.enableSubmit}
                            className="rounded border border-gray-400 px-3 py-1"
                        />
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Login;