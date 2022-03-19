import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header';
import Login from './pages/Login/Login';
import Detail from './pages/Detail/Detail';
import Profile from './pages/Profile/Profile';
import TodoList from './pages/TodoList/TodoList';
import TodolistRFC from './components/TodoListRFC.js/TodolistRFC';
import TodolistRedux from './components/TodolistRedux/TodolistRedux';
// import './style/style.css';
function App() {
  return (
    // Route phien ban 6. se khac voi 5. => video is on 5. verison
    // Vi Header khong dat ben trong Routes nen Header se duoc duy tri xuyen suot cac pages 
    <div>
      {/* <Header></Header>  dat o day cung duoc */}
      <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login></Login>}/>
          <Route path="/detail/:id/:name" element={<Detail></Detail>}/>
          <Route path='*' element={<Home />} /> {/** Return to Home khi have random URL */}
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path ='/todolist' element={<TodoList></TodoList>}/>
          <Route path ='/todolistrfc' element={<TodolistRFC></TodolistRFC>}/>
          <Route path='/todolistredux' element={<TodolistRedux></TodolistRedux>}/>
        </Routes>
      </BrowserRouter>
    </div>


    /**
     * <BrowserRouter>
     * <Switch>
     * <Route  exact path='/home' component={Home} />
        <Route  exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route  exact path='/' component={Home} />
     * </Switch>
        
    </BrowserRouter>
     * 
     */

  );
}

export default App;
