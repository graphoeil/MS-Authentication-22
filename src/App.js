// Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthContext } from "./context/AuthContext";

// Component
const App = () => {

	// Context
	const { isLoggedIn } = useAuthContext();

	// Return
	return(
		<Router>
			<Layout>
				<Switch>

					{/* Homepage */}
					<Route path='/' exact>
						<HomePage />
					</Route>
					{/* Homepage */}

					{/* AuthPage */}
					{
						!isLoggedIn && <Route path='/auth'>
							<AuthPage />
						</Route>
					}
					{/* AuthPage */}

					{/* ProfilePage, protected route with redirect */}
					<Route path='/profile'>
						{
							isLoggedIn ? <ProfilePage /> : <Redirect to="/auth"/>
						}
					</Route>
					{/* ProfilePage */}

					{/* 404, implicit redirect protected route */}
					<Route path="*" exact>
						<Redirect to="/"/>
					</Route>
					{/* 404 */}

				</Switch>
			</Layout>
		</Router>
	);

};

// Export
export default App;