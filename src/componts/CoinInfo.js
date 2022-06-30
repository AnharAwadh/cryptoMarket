import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptpContext';
import { CircularProgress, createTheme, makeStyles,ThemeProvider, } from "@material-ui/core";
import{Line}  from "react-chartjs-2"
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data.js';

const darkTheme=createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    selectbutton: {
        border: "1px solid gold",
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        
       
      
      },
  }));

const CoinInfo = ({coin}) => {
   const [historicalData,setHistoricalData] =useState();
   const [day,setDay]=useState(1);
   const {currency}=CryptoState()
  // const [flag,setflag] = useState(false);

   const fetchHistoricData = async () =>{
    const {data}= await axios.get(HistoricalChart(coin.id,day,currency));
    setHistoricalData(data.prices)
   }
   
   useEffect(() => {
    fetchHistoricData();
  }, [currency,day])
  
  const classes=useStyles();
  return (
   <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>
{
    //هنا فقع الكود
    !historicalData?(
        <CircularProgress
        style={{ color: "gold" }}
        size={250}
        thickness={1}/>
    ):(
        <>
        <Line
        data={{
            labels:historicalData.map((coin)=>{
                let date=new Date(coin[0]);
                let time=date.getHours()>12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
                return day===1?time:date.toLocaleDateString();
            }),
            datasets:[
               {data:historicalData.map((coin)=>coin[1]),
                label:`Price ( Past ${day} Days ) in ${currency}`,
                borderColor: "#EEBC1D",

        } ,
            
            ],

        }} 
        options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
       <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <button className={classes.selectbutton}
                  key={day.value}
                  onClick={() => {setDay(day.value);
                    
                  }}
                  selected={day.value === day}
                >
                  {day.label}
                </button>
              ))}
            </div>
        
        </>
    )
}
    </div>

   </ThemeProvider>
  )
}

export default CoinInfo