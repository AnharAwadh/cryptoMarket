import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider} from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptpContext'




const useStyles=makeStyles(()=>({
  
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
      },


}))
const darkTheme=createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  function Header()  {
    const classes=useStyles();
    const {currency, setCurrency} =CryptoState();
    const navigate = useNavigate();
    
 
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        {/* //use to help componts responsive */}
        <Container >
            <Toolbar>
            
                <Typography onClick={()=>navigate("/")} className={classes.title}>
                    Crpto Market
                    <Select 
                    variant='outlined' 
                     style={{ width: 100, height: 40, marginLeft:50 }} 
                    value={currency}  
                    onChange={(e) => setCurrency(e.target.value)}>
                        <MenuItem value={"USD"}> USD</MenuItem>
                        <MenuItem value={"BIC"}> BIC</MenuItem>


                    </Select>
                </Typography>
            </Toolbar>

        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header