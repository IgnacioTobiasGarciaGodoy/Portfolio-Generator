"use client"
import { useEffect, useState } from "react";
const DEFAULT_USER = "nombre_usuario1";
import Experience from "./Experience";
import Presentation from "./Presentation";
import AboutMe from "./AboutMe";
import Certificates from "./Certificates";
import Projects from "./Projects.jsx"
import Technologies from "./Technologies.jsx"

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
			<Experience experiences={portfolio.experience}/>
			<Presentation presentation={portfolio.presentation}/>

			<div className="flex justify-center space-x-4">
				{projects.map((project) => (
					<Projects
					key={project.id}
					title={project.title}
					imageSrc={project.imageSrc}
					projectUrl={project.projectUrl}
					description={project.description}
					/>
				))}
			</div>
			
			<Technologies techList={techList} />
		</div>
	);
}