import React from 'react';
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
	return (
		<div className="nav">
			<div className="logo">
				<Link to="/">N BREAD</Link>
			</div>
			<div className="menus">
				<Link to="/">서비스 소개</Link>
				<Link to="/calculation">N빵 하기</Link>
				<Link to="/inquiry">문의하기</Link>
			</div>
		</div>
	)
}

export default Navigation;