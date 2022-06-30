import './App.css';
import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './componts/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage'


  //use style in matlial ui

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  //use style in matlial ui
 
  const classes=useStyles();
  return (
    <BrowserRouter>
    <div className={classes.App}>
     
      <Header />
      <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/coins/:id" element={<CoinPage/>}/>

      </Routes>
     
    </div>
    
    </BrowserRouter>
  );
}

export default App;
