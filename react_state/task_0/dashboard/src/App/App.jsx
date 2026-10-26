import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications'
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';
import React from 'react';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      logout: props.logout ?? (() => {}),
      isLoggedIn: props.isLoggedIn ?? false,
      displayDrawer : false
    }

    

    this.courses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: "40" },
      { id: 3, name: "React", credit: "20" },
    ]

    this.notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'New data available' },
    ]
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }
  
  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true })
    console.log("display set to true")
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false })
    console.log("display set to false")
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      event.preventDefault()
      alert("Logging you out")
      this.state.logout()
    }
  }

  render() {
    const { isLoggedIn } = this.state

    return (
      <>
        <div className="App flex min-h-screen w-full flex-col px-3 sm:px-5">
          <div className='root-notifications'>
            <Notifications displayDrawer={this.state.displayDrawer} notifications={this.notificationsList} handleDisplayDrawer={this.handleDisplayDrawer} handleHideDrawer={this.handleHideDrawer} />
          </div>
          <Header />
          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={this.courses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
            </BodySectionWithMarginBottom>
          )}
          <Footer />
        </div>
      </>
    )
  }
}

export default App;