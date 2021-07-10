/* eslint-disable react/prop-types */
import logo from './logo.svg';
import './App.css';
import { useEffect, useState  } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    '& > *': {
      flex: '0 0 4.8em',
      boxSizing: 'border-box',
      margin: '10px 0px 0 10px'
    },
  },
}));


function App() {
  const [currencyList,setcurrencies] = useState(0);
  const [page,setPage] = useState(0)

  useEffect(() => {
    axios.get(process.env.REACT_APP_CG_BASE_URL+`/coins/markets?order=market_cap_desc&vs_currency=usd&per_page=8&page=${page}`)
        .then(res => {
          console.log(res.data)
          const currencies = res.data
          let currencyList = [];
          currencies.forEach((item,index)=>{
            currencyList.push(
              <Paper elevation={3} key={index} style={{padding:10}}>
                 <img src={item.image} style={{width:'40%'}} />
                <div style={{display:'flex',justifyContent:'flex-start',fontSize:'12px'}}>
                  <div >{item.name}</div><div> ${item.current_price}</div>
                </div>
                <>{item.price_change_percentage_24h.toFixed(2)}</>
              </Paper>
             )
          })
          setcurrencies( currencyList );
          
    })
  }, []);
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {currencyList}    
      </div>
    </>
  );
}

export default App;
