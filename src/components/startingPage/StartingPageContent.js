// Imports
import React from "react";
import styled from "styled-components";

// Component
const StartingPageContent = () => {

	// Return
	return(
		<Wrapper>
			<h1>Welcome on Board!</h1>
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
export default StartingPageContent;