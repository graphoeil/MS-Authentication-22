// Imports
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// Component
const AuthForm = () => {

	// History
	const history = useHistory();

	// Context
	const { login } = useAuthContext();

	// Uncontrolled form
	const emailRef = useRef();
	const passwordRef = useRef();

	// States
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	// Toggle is login
	const switchAuthMode = () => {
		setIsLogin((oldState) => {
			return !oldState;
		});
	};

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		// Validation
		if (!email.trim() || !password.trim()){
			return;
		}
		// Loading
		setIsLoading(true);
		// Login // Signup mode
		let urlFirebase;
		if (isLogin){
			urlFirebase = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ process.env.REACT_APP_FIREBASE_APIKEY }`;
		} else {
			urlFirebase = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ process.env.REACT_APP_FIREBASE_APIKEY }`;
		}
		// Send request to create or signin in an account
		// https://cloud.google.com/identity-platform/docs/use-rest-api => Online docs
		fetch(urlFirebase,{
			method:'POST',
			body:JSON.stringify({ email, password, returnSecureToken:true }),
			headers:{ 'Content-Type':'application/json' }
		}).then((response) => {
			// Loading
				setIsLoading(false);
			if (response.ok){
				// Success, idToken is receive with the payload only if email/password are valid
				return response.json(); // Return a promise - A
			} else {
				// Failed
				response.json().then((data) => {
					// Error message
					const errorMessage = data?.error?.message || 'Authentication failed...';
					throw new Error(errorMessage); // Throw - B
				});
			}
		}).then((data) => {
			// Because data.expiresIn is in seconds and we must pass in ms
			const expirationTime = new Date(new Date().getTime() + Number(data.expiresIn * 1000));
			// Promise return in case of success - A
			login(data.idToken, expirationTime.toISOString()); // Go to context
			history.replace('/profile');
		}).catch((error) => {
			alert(error.message); // Catch - B
		});
	};

	// Return
	return(
		<Wrapper>
			<h1>{ isLogin ? 'Login' : 'Sign Up' }</h1>
			<form onSubmit={ handleSubmit }>
				<div className="authControls">
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' ref={ emailRef } required />
				</div>
				<div className="authControls">
					<label htmlFor='password'>Your Password</label>
					<input type='password' id='password' ref={ passwordRef } required />
				</div>
				<div className="authActions">
					{ !isLoading && <button>{ isLogin ? 'Login' : 'Create Account' }</button> }
					{ isLoading && <p>Sending request...</p> }
					<button type='button' className="toggle" onClick={ switchAuthMode }>
						{ isLogin ? 'Create new account' : 'Login with existing account' }
					</button>
				</div>
			</form>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	margin: 3rem auto;
	width: 95%;
	max-width: 25rem;
	border-radius: 6px;
	background-color: #38015c;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	padding: 1rem;
	text-align: center;
	h1{
		text-align: center;
		color: white;
	}
	.authControls{
		margin-bottom: 0.5rem;
		label{
			display: block;
			color: white;
			font-weight: bold;
			margin-bottom: 0.5rem;
		}
		input{
			font: inherit;
			background-color: #f1e1fc;
			color: #38015c;
			border-radius: 4px;
			border: 1px solid white;
			width: 100%;
			text-align: left;
			padding: 0.25rem;
		}
	}
	.authActions{
		margin-top: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		button{
			cursor: pointer;
			font: inherit;
			color: white;
			background-color: #9f5ccc;
			border: 1px solid #9f5ccc;
			border-radius: 4px;
			padding: 0.5rem 2.5rem;
			&:hover{
				background-color: #873abb;
				border-color: #873abb;
			}
			&.toggle{
				margin-top: 1rem;
				background-color: transparent;
				color: #9f5ccc;
				border: none;
				padding: 0.15rem 1.5rem;
				&:hover{
					background-color: transparent;
					color: #ae82cc;
				}
			}
		}
		p{ color: white; }
	}
`;

// Export
export default AuthForm;