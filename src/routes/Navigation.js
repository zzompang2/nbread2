import React from 'react';
import { Link } from "react-router-dom";
import "./Navigation.css";
import { Home } from "../icons/home";
import { DollarSign } from "../icons/dollarSign";
import { Mail } from "../icons/mail";

export default function Navigation() {
	return (
		<div className="nav">
			<div className="logo">
				<Link to="/">NB</Link>
			</div>
			<div className="menus">
				<Link to="/">
					<Home />
				</Link>
				<Link to="/calculation">
					<DollarSign />
				</Link>
				<Link to="/inquiry">
					<Mail />
				</Link>
			</div>
		</div>
	)
}