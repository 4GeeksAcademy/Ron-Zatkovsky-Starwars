import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardDetails } from "../views/CardDetails.jsx";

export const Navbar = () => {
	const {store,action}=useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">React Boilerplate</span>
			</Link>
			<div className="ml-auto d-flex">
				<div class="dropdown">
					<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Favorites
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{Object.entries(store.favorites).map(([cat,array],index)=>(
							array===undefined?null:
							<ul key={index}>
								{console.log('array ',array)}
								{store.favorites[cat]!=undefined?<strong>{cat}</strong>:null}
								{array.map((favoriteName)=>{
									if(!(favoriteName===null || favoriteName===undefined || favoriteName[0]==="")){
										return (
										<li>
											<Link to={`/CardDetails/${cat}/${favoriteName[1]}`}>
												{favoriteName[0]}
											</Link>
										</li>
										)
									}
								})}
							</ul>
						))}
					</div>
				</div>
				<Link to="/demo">
					<button className="btn btn-primary">Check the Context in action</button>
				</Link>
			</div>
		</nav>
	);
};
