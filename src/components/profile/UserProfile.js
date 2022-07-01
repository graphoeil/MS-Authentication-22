// Imports
import React from "react";
import styled from "styled-components";
import ProfileForm from "./ProfileForm";

// Component
const UserProfile = () => {

	// Return
	return(
		<Wrapper>
			<h1>Your User Profile</h1>
			<ProfileForm/>
		</Wrapper>
	);

};

// Styled
const Wrapper = styled.section`
	margin: 3rem auto;
	text-align: center;
	h1{
		font-size: 48px;
	}
`;

// Export
export default UserProfile;