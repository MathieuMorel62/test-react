import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import './App.css'
import Notifications from '../Notifications/Notifications'

function App() {
  return (
    <>
      <div className="App">
          <div className='root-notifications'>
            <Notifications/>
          </div>
          <Header/>
          <Login/>
          <Footer/>
      </div>
    </>
  );
}

export default App;
