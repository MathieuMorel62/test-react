import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import React from 'react';
import AppContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends React.Component {
  constructor(props) {
    super(props)

    const user = {
      email: '',
      password: '',
      isLoggedIn: false
    }

    this.notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
    ]

    this.coursesList = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: "40" },
      { id: 3, name: "React", credit: "20" },
    ]

    this.state = {
      displayDrawer: false,
      user,
      notifications: this.notificationsList,
      courses: this.coursesList
    }

    this.providerValue = {
      user,
      logOut: this.logOut
    }
  }

  logIn = (email, password) => {
    this.setState((prevState) => {
      const user = {
        ...prevState.user,
        email,
        password,
        isLoggedIn: true
      }

      this.providerValue = {
        user,
        logOut: this.logOut
      }

      return { user }
    })
  }

  logOut = () => {
    this.setState(() => {
      const user = {
        email: '',
        password: '',
        isLoggedIn: false
      }

      this.providerValue = {
        user,
        logOut: this.logOut
      }

      return { user }
    })
  }

  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`)
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id
      )
    }))
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true })
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false })
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault()
      alert("Logging you out")
      this.logOut()
    }
  }

  render() {
    const { user } = this.state

    return (
      <AppContext.Provider value={this.providerValue}>
        <div className="App flex min-h-screen w-full flex-col px-3 sm:px-5">
          <div className="root-notifications">
            <Notifications
              displayDrawer={this.state.displayDrawer}
              notifications={this.state.notifications}
              markNotificationAsRead={this.markNotificationAsRead}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <Header />
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={this.state.courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom>
              <LoginWithLogging
                email={user.email}
                password={user.password}
                logIn={this.logIn}
              />
            </BodySectionWithMarginBottom>
          )}
          <Footer />
        </div>
      </AppContext.Provider>
    )
  }
}

export default App;
