import { useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications } from './features/notifications/notificationsSlice';
import { fetchCourses } from './features/courses/coursesSlice';


const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

export default function App() {

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const {courses} = useSelector((state) => state.courses)

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch, isLoggedIn]);



  return (
    <div className={css(styles.app)}>
      <Notifications/>
      <>
        <Header/>
        {!isLoggedIn ? (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login/>
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList/>
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer/>
    </div>
  );
}
