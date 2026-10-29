import { useContext } from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg'
import AppContext from '../Context/context';

function Header (){
  const {user, logOut} = useContext(AppContext)
  return (
     <>
       <div className="header">
         <header className="Header flex flex-col items-start gap-3">
           <img className="w-24 min-[520px]:w-[150px]" src={holbertonLogo} alt="Holberton logo" />
           <h1 className="m-0 text-2xl text-[var(--main-color)] min-[520px]:text-[2rem]">School dashboard</h1>
            {
              user.isLoggedIn &&
              (
                <div id='logoutSection'>
                  <p>Welcome {user.email}</p>
                  <a
                    href="#logout"
                    onClick={logOut}
                    className="cursor-pointer text-blue-600 underline"
                  >
                    (logout)
                  </a>
                </div>
              )
            }
            
         </header>
        </div>
   </>
   )
}

export default Header;
