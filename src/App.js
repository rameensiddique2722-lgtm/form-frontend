

import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Header from "./Component/Header";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Skill from "./Component/Skill";
import Experience from "./Component/Experience";
import Home from "./Component/Home";
import Project from "./Component/Project";
function App() {
  
  return (
    <div className="App">
       <Login/>
      <Signup/>
      <Header/>
      <Home/>
      <Skill/>
      <Experience/>
      <Project/>
     
<About/>
<Contact/>
    </div>
  );
}

export default App;
