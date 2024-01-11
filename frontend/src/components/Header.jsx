import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const dispatch = useDispatch();
	const [logoutApiCall] = useLogoutMutation();
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<header>
				<nav>
					<div className="nav-left">
						<h2>Chihab's Messaging App</h2>
					</div>
					<div className="nav-right">
						{userInfo ? (
							<>
								<Link to="/profile">{userInfo.firstName}</Link>
								<Link onClick={logoutHandler}>Logout</Link>
							</>
						) : (
							<>
								<ul>
									<li>
										<Link to="/login">Sign In</Link>
									</li>

									<li>
										<Link to="/signup">Sign Up</Link>
									</li>
								</ul>
							</>
						)}
					</div>
				</nav>
			</header>
		</>
	);
};
export default Header;
