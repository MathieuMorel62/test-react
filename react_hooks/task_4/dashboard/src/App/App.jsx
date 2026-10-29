import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import React, { useContext, useState,useMemo } from 'react';
import AppContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App(props){

  const context = useContext(AppContext)
  const userContext = context.user
  const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
  ]

  const coursesList = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: "40" },
      { id: 3, name: "React", credit: "20" },
  ]


  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(userContext)
  const [notifications, setNotifications] = useState(notificationsList)
  

  const logIn = (email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }

  const logOut = () => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }

  const markNotificationAsRead = React.useCallback((id) => {
    
    setNotifications(previousNotifications =>
      previousNotifications.filter(
        (notification) => notification.id !== id
      )
    );
    console.log(`Notification ${id} has been marked as read`);
  }, [])

  const handleDisplayDrawer = React.useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = React.useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const provider = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut]
  );

  return (
      <AppContext.Provider value={provider}>
        <div className="App flex min-h-screen w-full flex-col px-3 sm:px-5">
          <div className="root-notifications">
            <Notifications
              displayDrawer={displayDrawer}
              notifications={notifications}
              markNotificationAsRead={markNotificationAsRead}
              handleDisplayDrawer={handleDisplayDrawer}
              handleHideDrawer={handleHideDrawer}
            />
          </div>
          <Header />
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging
                email={user.email}
                password={user.password}
                logIn={logIn}
              />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    )

}


export default App;
