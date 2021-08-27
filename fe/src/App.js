import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from './components/HomePage/HomePage'
import { CourseSearch } from './components/CourseSearch/CourseSearch'
import { CoursePage } from './components/CoursePage/CoursePage'
import { Courses } from './components/Courses/Courses'
import { SiteHeader } from './SiteHeader'
import './App.css'

function App() {
  return (
    <div className="App">
      <div>
        <SiteHeader />
      </div>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/search' exact component={CourseSearch}/>
          <Route path='/course' component={CoursePage}/>
          <Route path='/courses' exact component={Courses}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
