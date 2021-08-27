import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { CourseSearch } from './components/CourseSearch'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={CourseSearch}/>
          <Route path='/course' exact component={Coursepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
