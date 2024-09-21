import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const CardDetails=()=>{
    const params = useParams();
    const [cardInfo, setCardInfo] = useState([]);
    const [fixedCategory,setFixedCategory]=useState("");


    useEffect(() => {
        const getCardInfo = async () => {
          try {
            const response = await fetch(`https://www.swapi.tech/api/${params.category}/${params.uid}/`);
            const jsonData = await response.json();
            setCardInfo(jsonData.result.properties);
            console.log(jsonData.result.properties);
          } catch (error) {
            console.error("Error fetching card info:", error);
          }
        };
        getCardInfo();
    },[]);

    useEffect(()=>{
        if(params.category.toLowerCase()==="people"){
          setFixedCategory("characters")
        }
        else{
          setFixedCategory(params.category.toLowerCase())
        }
      },[])


    return(
        <div className="container-fluid mx-auto">
          <div className="row mx-auto ">
            <div className="col-8 mx-auto justify-content-center">
              <div className="col-9 mx-auto justify-content-center fs-1">{cardInfo.name}</div>
              <img src={`https://starwars-visualguide.com/assets/img/${fixedCategory}/${params.uid}.jpg`} style={{width:"18vw",height:'20vw'}} class="card-img-top"/>
                <div className="row p-2">
                  {Object.entries(cardInfo).map(([property,detail])=>{
                      if(property!="name" && property!="url" && property!="created" && property!="edited" && property!="homeworld" && property!="people" && property!="pilots" && property!="films") {
                      return(
                          <>
                              <div className="row" key={cardInfo.name}>
                                  <p className="col"  style={{fontSize:"0.8vw"}}><strong>{property}:</strong> {detail}</p>
                              </div>
                          </>)
                      }
                      else{
                      return null
                      }
                  })}
                  <Link to={`/`}>
                      <span className="btn btn-primary btn-lg" href="#" role="button">
                      Go Back
                      </span>
                  </Link>
                </div>
            </div>
          </div>
        </div>
    )
}