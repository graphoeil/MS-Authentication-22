// Imports
import React, { useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

// Component
const ProfileForm = () => {

	// Context
	const { token } = useAuthContext();

	// History
	const history = useHistory();

	// Uncontrolled form
	const passwordRef = useRef();

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		const password = passwordRef.current.value;
		if (!password.trim()){
			return;
		}
		/* With other types of configuration we must pass the token in the url :
		https://identitytoolkit.googleapis.com/v1/accounts:update?key=${ process.env.REACT_APP_FIREBASE_APIKEY }&idToken=${ token },
		or pass it in the headers - A */
		fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${ process.env.REACT_APP_FIREBASE_APIKEY }`,{
			method:'POST',
			body:JSON.stringify({ idToken:token, password, returnSecureToken:false }),
			// headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer token' } - A
			headers:{ 'Content-Type':'application/json' }
		}).then((response) => {
			// Redirect to home
			history.replace('/');
		});
		// We could add more logic, then((reponse) => { success or fail }) ... see
	};

	// Return
	return(
		<Wrapper onSubmit={ handleSubmit }>
			<div className="profileControls">
				<label htmlFor='new-password'>New Password</label>
				<input type='password' id='new-password' minLength="6" required ref={ passwordRef } />
			</div>
			<div className="profileActions">
				<button>Change Password</button>
			</div>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.form`
	width: 95%;
	max-width: 25rem;
	margin: 2rem auto;
	.profileControls{
		margin-bottom: 0.5rem;
		label{
			font-weight: bold;
			margin-bottom: 0.5rem;
			color: #353336;
			display: block;
		}
		input{
			display: block;
			font: inherit;
			width: 100%;
			border-radius: 4px;
			border: 1px solid #38015c;
			padding: 0.25rem;
			background-color: #f7f0fa;
		}
	}
	.profileActions{
		margin-top: 1.5rem;
		button{
			font: inherit;
			cursor: pointer;
			padding: 0.5rem 1.5rem;
			border-radius: 4px;
			background-color: #38015c;
			color: white;
			border: 1px solid #38015c;
			&:hover{
				background-color: #540d83;
				border-color: #540d83;
			}
		}
	}
`;

// Export
export default ProfileForm;