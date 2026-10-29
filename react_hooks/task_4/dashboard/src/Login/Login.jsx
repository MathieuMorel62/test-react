import { Fragment } from 'react';
import { useState } from 'react';


function Login (props){
    const [enableSubmit, setEnableSubmit] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: ''})
    
    function handleChangeEmail (event) {
          const nextFormData = {
            ...formData,
            email: event.target.value,
        }
        setFormData(nextFormData)
        handleEnableSubmit(nextFormData)
    }

    function handleChangePassword (event) {
        const nextFormData = {
            ...formData,
            password: event.target.value,
        }
        setFormData(nextFormData)
        handleEnableSubmit(nextFormData)
    }

    function handleEnableSubmit (data) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isValid = data.email.trim() !=""
        && emailRegex.test(data.email)
            && data.password.trim() != ""
            && data.password.length >= 8
        if(isValid) setEnableSubmit(true)
    }

    function handleLoginSubmit (event) {
        event.preventDefault();
        props.logIn(formData.email, formData.password)
    }


    return(
            <Fragment>
                <div className="Login flex min-h-[70vh] flex-col items-start gap-2 border-t-2 border-[var(--main-color)] p-3 min-[520px]:p-5">
                    <p>Login to access the full dashboard</p>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            value={formData.email}
                            id="email"
                            name="email"
                            onChange={handleChangeEmail}
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            value={formData.password}
                            id="password"
                            name="password"
                            onChange={handleChangePassword}
                        />

                        <input
                            type="submit"
                            value="OK"
                            disabled={!enableSubmit}
                            className="rounded border border-gray-400 px-3 py-1"
                        />
                    </form>
                </div>
            </Fragment>
        )

}

export default Login;