// Imports
import React from "react";
import MainNavigation from "./MainNavigation";

// Component
const Layout = ({ children }) => {

	// Return
	return(
		<React.Fragment>
			<MainNavigation/>
			<main>{ children }</main>
		</React.Fragment>
	);

};

// Export
export default Layout;