"use client"
import { useEffect, useState } from "react";
const DEFAULT_USER = "nombre_usuario1";

export default function Home() {
    const [portfolio, setPortfolio] = useState(null);

	useEffect(() => {
		fetch(`http://localhost:3000/portfolio/${DEFAULT_USER}`)
			.then(res => res.json())
			.then(data => setPortfolio(data))
			.catch(error => console.log(error));
	}, []);
	
	return (
		<div>
			<AboutMe aboutMe={portfolio.aboutMe}></AboutMe>
		</div>
	);
}
