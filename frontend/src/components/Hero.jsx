import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<>
			<h2>Chihab's Messaging App</h2>
			<p>
				This is a Project test from The Odin Project that allows different users
				to register, login, logout, update user info, and send/receive messages
				from different users.
			</p>
			<div>
				You can either <Link to="/login">Sign In</Link> or
				<Link to="/signup">Sign Up</Link> to start using our app.
			</div>
		</>
	);
};
export default Hero;
