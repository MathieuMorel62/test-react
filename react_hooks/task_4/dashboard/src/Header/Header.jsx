import holbertonLogo from '../assets/holberton-logo.jpg'
import AppContext from '../Context/context';
import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props)
  }
  static contextType = AppContext
  render(){
    const {user, logOut} = this.context
    console.log(user)
    return (
     <>
       <div className="header">
         <header className="Header flex flex-col items-start gap-3 border-b-2 border-[var(--main-color)] p-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-5 min-[520px]:p-5">
           <img className="w-24 min-[520px]:w-[150px]" src={holbertonLogo} alt="Holberton logo" />
           <h1 className="m-0 text-2xl text-[var(--main-color)] min-[520px]:text-[2rem]">School dashboard</h1>
         </header>
     </div>
     {
       user.isLoggedIn &&
       (
         <div id='logoutSection'>
           <p>Welcome {user.email}</p>
           <a onClick={logOut}>Logout</a>
         </div>
       )
     }
   </>
    )
  }

}

export default Header;
