import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Header from './components/Home/Header';
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
