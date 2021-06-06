import React from 'react';
import { Link } from "react-router-dom";

function Navigation() {
	return (
		<div>
			<Link to="/">서비스 소개</Link>
			<Link to="/calculation">N빵 하기</Link>
      <Link to="/inquiry">문의하기</Link>
		</div>
	)
}

export default Navigation;