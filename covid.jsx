import axiosHero from "axios";
import React, { useEffect, useState } from 'react';
import Alphabet from "./Alphabet";
import ccodes from './countrycode.json';
import demoflag from './empty.jpg';

const fetchDataAxios = async ( letter ) => {

  const datacenter = await axiosHero.get("https://covid-193.p.rapidapi.com/statistics", {
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "b8b679d0d8msh05c65a5a3cfdb34p1337b3jsnc1c598d825a0",
    }
  });

  const mydata = datacenter.data.response;
  let dataFinal = [];

  for( let mydatabox in mydata ){
      if( mydata[ mydatabox ].country.charAt( 0 ) === letter ){
        dataFinal.push( mydata[ mydatabox ] );
      }
  }
  return dataFinal;

}

function CovidHero(){

    const [ countryInfos , setCountryInfos ] = useState([]);
    const [ countryLetter , setCountryLetter ] = useState("A");
    const [ zip ] = useState(ccodes.codes);

    const dataRender = () =>{
      fetchDataAxios( countryLetter ).then( (datahero) => {
        setCountryInfos( datahero );
      });
    }

    useEffect( () => { 
        fetchDataAxios( countryLetter ).then( (datahero) => {
            setCountryInfos( datahero );
          });
     } , [countryLetter]);

    const getCountry = ( userInfo ) => userInfo.country
    const getTotalCase = ( userInfo ) => userInfo.cases.total
    const getNewCase = ( userInfo ) => userInfo.cases.new != null ? userInfo.cases.new : 0;
    const getActiveCase = ( userInfo ) => userInfo.cases.active
    const getCriticalCase = ( userInfo ) =>  userInfo.cases.critical != null ? userInfo.cases.critical : 0;
    const getRecCase = ( userInfo ) => userInfo.cases.recovered;
    const getDeathsTotal = ( userInfo ) => userInfo.deaths.total;
    const getDeathsNew = ( userInfo ) => userInfo.deaths.new != null ? userInfo.deaths.new : 0;

    const getFlag = ( userInfo ) => {
        let codeFlag = zip.find( object => object.name === userInfo.country);
        if( typeof codeFlag !== "undefined" ){
            let pathFlag = "https://flagcdn.com/80x60/";
            pathFlag += ( codeFlag.code ).toLowerCase();
            pathFlag += ".png";
            return pathFlag;
        }else{
          return demoflag;
        }
    };
    

    const onTaskHero = (HeroLetter) => {
      document.querySelector(".gun").classList.remove("gun");
      document.querySelector(".ltr[data-letter='" + HeroLetter + "']").classList.add("gun");
      setCountryLetter(HeroLetter);
      dataRender();
    }

    return (
    <React.Fragment>
        <Alphabet onTaskHero = {onTaskHero} />
        <div className="treeBody">
          {
            countryInfos.map((countryInfo, idx) => {
              return (
                <div className="box" key={idx}>
                  <div className="country--header JV--row">
                      <h2>{getCountry(countryInfo)}</h2>
                      <img src={getFlag(countryInfo)} alt={getFlag(countryInfo)} />
                  </div>
                  <div className="total JV--row"><span>Total cases:</span><span>{getTotalCase(countryInfo)}</span></div>
                  <div className="new JV--row"><span>New cases:</span><span>{getNewCase(countryInfo)}</span></div>
                  <div className="active JV--row"><span>Active cases:</span><span>{getActiveCase(countryInfo)}</span></div>
                  <div className="critical JV--row"><span>Cases in danger:</span><span>{getCriticalCase(countryInfo)}</span></div>
                  <div className="recovered JV--row"><span>Recovered:</span><span>{getRecCase(countryInfo)}</span></div>
                  <div className="deaths JV--row"><span>Deaths:</span><span>{getDeathsTotal(countryInfo)}</span></div>
                  <div className="newdeaths JV--row"><span>New deaths:</span><span>{getDeathsNew(countryInfo)}</span></div>
                </div>
              );
            })
          }
        </div>
    </React.Fragment>
    );

}

export default CovidHero;
