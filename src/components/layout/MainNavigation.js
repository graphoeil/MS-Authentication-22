// Imports
import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// Component
const MainNavigation = () => {

	// History
	const history = useHistory();

	// Context
	const { isLoggedIn, logout } = useAuthContext();

	// Logout and redirect to login page
	const handleClick = () => {
		logout();
		history.push('/auth');
	};

	// Return
	return(
		<Wrapper>
			<div className="logo">
				<Link to="/">React Auth</Link>
			</div>
			<nav>
				<ul>
					{
						!isLoggedIn && <li>
							<Link to='/auth'>Login</Link>
						</li>
					}
					{
						isLoggedIn && <React.Fragment>
							<li>
								<Link to='/profile'>Profile</Link>
							</li>
							<li>
								<button onClick={ handleClick }>
									Logout
								</button>
							</li>
						</React.Fragment>
					}
				</ul>
			</nav>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.header`
	width: 100%;
	height: 5rem;
	background-color: #38015c;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10%;
	.logo{
		font-family: 'Lato', sans-serif;
		font-size: 2rem;
		color: white;
		margin: 0;
		a{
			color: white;
			text-decoration: none;
			&:hover{
				color: #c291e2;
			}
		}
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: baseline;
		li{
			margin: 0 1rem;
			a{
				text-decoration: none;
				color: white;
				font-weight: bold;
				&:hover{
					color: #c291e2;
				}
			}
			button{
				font: inherit;
				background-color: transparent;
				border: 1px solid white;
				color: white;
				font-weight: bold;
				padding: 0.5rem 1.5rem;
				border-radius: 6px;
				cursor: pointer;
				&:hover{
					background-color: #c291e2;
					color: #38015c;
				}
			}
		}
	}
`;

// Export
export default MainNavigation;