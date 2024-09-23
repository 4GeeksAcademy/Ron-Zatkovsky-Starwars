import React, { useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/Card.jsx";

export const Home=()=>{
	const [imageList,setImageList]=useState([]);

	const topics=['people',
		'planets','vehicles','species',
		'starships'
	]
	
	// useEffect(()=>{
	// 	console.log(imageList);
	// },[imageList])

	useEffect(()=>{
		const getData= ()=>{
			topics.forEach((topic)=>{
				fetch(`https://www.swapi.tech/api/${topic}`).then((response)=>{
					return response.json();
				}).then((jsonData)=>{
					setImageList((prevState)=>[...prevState,[topic,jsonData.results]]);
				})
			})
		}
		getData();
	},[])
	return(
		<div className="container-fluid mx-auto overflow-auto">
			{imageList.map((pictureSet)=>{
				return(
					<>
						<h1>{pictureSet[0]}</h1>
						<div className="row gx-2 my-auto">
							{pictureSet[1].map((picInfo)=>{
								return(
									<Card url={picInfo.url} name={picInfo.name} category={pictureSet[0]} uid={picInfo.uid}/>
								)								
							})}
						</div>
					</>
				)
			})}
		</div>
	)
};
