import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = (props) => {
  const [cardInfo, setCardInfo] = useState([]);
  const [fixedCategory,setFixedCategory]=useState("");
  const [liked,setLiked]=useState(false);

  const {store,actions}=useContext(Context);

  useEffect(() => {
    const getCardInfo = async () => {
      try {
        let cardInfoByName={};
        const response = await fetch(props.url);
        const jsonData = await response.json();
        if(!cardInfoByName[props.name]){
          cardInfoByName[props.name]=[];
        }
        cardInfoByName[props.name].push(jsonData.result.properties)
        setCardInfo(cardInfoByName);
      } catch (error) {
        console.error("Error fetching card info:", error);
      }
    };
    getCardInfo();
  }, []);

  useEffect(()=>{
    if(props.category.toLowerCase()==="people"){
      setFixedCategory("characters")
    }
    else{
      setFixedCategory(props.category.toLowerCase())
    }
  },[])

  const favoriteHandler=(name)=>{
    console.log(name)
    if(liked===false){
      actions.setFavorites([...store.favorites,name])
      setLiked(true);
    }
    else{
      const newstore=store.favorites.map((item)=>{
        if(item!=name){
          return item;
        }
      });
      actions.setFavorites(newstore);
      setLiked(false);
    }
  }
  return (
    <div className="col">
        {Object.entries(cardInfo).map(([name,info])=>{
            return(
                <div className="col mb-2" key={props.uid}>
                  <div className="card overflow-auto" style={{width:"18vw",height:'20vw'}}>
                    <div className="row d-flex">
                      <div className="col-10"><strong>{name}</strong></div>
                      <button className="col" onClick={()=>{favoriteHandler(name)}}>
                        <i class="fa-regular fa-heart"></i>
                      </button>
                    </div>
                    <img src={`https://starwars-visualguide.com/assets/img/${fixedCategory}/${props.uid}.jpg`} class="card-img-top"/>
                    {/* {console.log(name," ",info)} */}
                    {Object.entries(info[0]).map(([property,detail],index)=>{
                      if(index<3 && property!="name" && property!="url" && property!="created" && property!="edited" && property!="homeworld" && property!="people" && property!="pilots" && property!="films") {
                        return(
                          <>
                            <div className="card-body p-0 m-0" key={name}>
                              <p className="card-text ps-1"  style={{fontSize:"0.5vw"}}><strong>{property}:</strong> {detail}</p>
                            </div>
                          </>)
                      }
                      else{
                        return null
                      }
                    })}
                    <Link to={`/CardDetails/${props.category}/${props.uid}`}>
                      <span className="btn btn-primary btn-lg" href="#" role="button">
                        Details
                      </span>
                    </Link>
                  </div>
                </div>
            )
        })}
    </div>
  );
};


// {cardInfo[1].map((info) => (
//     <div key={info.id} className="card" style={{ width: "18rem" }}>
//       <img src="..." className="card-img-top" alt="..." />
//       <div className="card-body">
//         <h5 className="card-title">{cardInfo[0]}</h5>
//         {info.properties
//           ? Object.entries(info.properties).map(([property, detail]) => (
//               <p key={property}>
//                 {property}: {detail}
//               </p>
//             ))
//           : null}
//         <a href="#" className="btn btn-primary">
//           Go somewhere
//         </a>
//       </div>
//     </div>
//   ))}