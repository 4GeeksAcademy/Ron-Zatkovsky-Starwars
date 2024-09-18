import React, { useEffect, useState } from "react";

export const Card = (props) => {
  const [cardInfo, setCardInfo] = useState([]);
  const [cardPics,setCardPics]=useState([]);
  const [fixedCategory,setFixedCategory]=useState("");

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

  return (
    <div className="col">
        {Object.entries(cardInfo).map(([name,info])=>{
            return(
                <div className="col mb-2" key={props.uid}>
                  <div className="card overflow-auto" style={{width:"18vw",height:'20vw'}}>
                    <h6 className="card-title mx-auto">{name}</h6>
                    <img src={`https://starwars-visualguide.com/assets/img/${fixedCategory}/${props.uid}.jpg`} class="card-img-top"/>
                    {console.log(name," ",info)}
                    {Object.entries(info[0]).map(([property,detail])=>{
                      if(property!="name" && property!="url" && property!="created" && property!="edited" && property!="homeworld" && property!="people" && property!="pilots" && property!="films") {
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
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
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