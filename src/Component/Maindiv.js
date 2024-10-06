import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function Maindiv(){

   let [place,setplace]=useState("");
   let [weather,setweather]=useState([]);
   let [store,setstore]=useState([]);
   

   function search(event)
      {
        if(event.target.value==="")
          {setweather([]); setstore([]);setplace("");}
        else
          setplace(event.target.value);}

      
  
   async function getdata(){

    //.........get the status code first..if it matches then go ahead
   let res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=ff2e96770fa2b83371d64d346375d01e`); 

   let ans= await res.json();
   
   setweather(ans.weather[0]);
   setstore(ans.main);
   

    }

    useEffect( ()=>{ getdata();},[place] );      //1st render+ everytime the place changes

    function Clear()
       {setplace(""); setweather([]); setstore([]);}

    

    return(
      <>
      <div className="main">

        <div className="inputdata">
        <span><SearchIcon />&nbsp;
        < input type="text" value={place} onChange={search}  placeholder="Search for the place" autoFocus/>
        
        <button title="clear" onClick={Clear}><ClearIcon/></button>
        </span>
        </div>

        {place.length>=3 && place.length<=14 ? (<>
        <div className="image">
            {weather.length!==0?(<img src={`Weather_icons/${weather.icon}.png`}/>):(<img src="Weather_icons/unknown.png" alt="imge"/>)}
        </div>

        <div className="loc_info">
         <div className="descripi"  > 
            <div className="left">
                <h2>{place} </h2>
                <p style={{marginTop:"5px"}}>{weather.description}</p>
            </div> 
            <div className="right">
                <h1>{Math.round(store.temp)}&deg;C</h1>
            </div>
        </div>

          <div className="details">
          <div className="row">
          <p>Details</p></div>
          
          <div className="row">
          <p className="cl1">Feels like</p> <p className="cl2">{Math.round(store.feels_like)}&deg;C</p></div>
          <div className="row"><p className="cl1">Humidity</p>   <p className="cl2">{Math.round(store.humidity)}%</p></div>
          <div className="row"><p className="cl1">Pressure</p>   <p className="cl2">{Math.round(store.pressure)}hPa</p></div>
          </div>
          
        </div></>)
      
        :(<p className="errormsg">No match found !!</p>)}

      </div>
      
      </>

    );
}

export default Maindiv;