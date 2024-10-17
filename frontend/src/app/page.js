"use client"
import { useEffect, useState } from "react";
const DEFAULT_USER = "nombre_usuario1";
import AboutMe from "./AboutMe";
import Certificates from "./Certificates";

export default function Home() {
    const [portfolio, setPortfolio] = useState({});
	const [isLoading, setIsLoading] = useState(true)

	console.log("Portfolio", portfolio);

	useEffect(() => {
		fetch(`http://localhost:4000/portfolio/${DEFAULT_USER}`)
			.then(res => {
				console.log("Respuesta", res)
				return res.json();
			})
			.then(data => {
				console.log("Data: ", data)
				setPortfolio(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.log(error);
				setIsLoading(false);
			});
	}, []);

	if(isLoading){
		return <div>Cargando...</div>
	}

	if (!portfolio || !portfolio.aboutMe || !portfolio.certificates) {
		return <div>No se encontraron datos</div>;
	}
	
	return (
		<div>
			<AboutMe aboutMe={ portfolio.aboutMe }/>
			<Certificates certificates={ portfolio.certificates }/>
		</div>
	);
}