import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { setCredentials } from "./../slices/authSlice";
import { toast } from "react-toastify";

const SignupScreen = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [signup, { isLoading }] = useSignupMutation();

	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await signup({
					firstName,
					lastName,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate("/");
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};
	return (
		<>
			<FormContainer>
				<h1>Sign Up</h1>
				<form onSubmit={submitHandler}>
					<div>
						<label htmlFor="firstName">First Name: </label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="lastName">Last Name: </label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="email">Email Adress</label>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="confirmPassword">Confirm password: </label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>

					{isLoading && <Loader />}

					<button type="submit">Sign Up</button>
					<div>
						<p>
							Already a member? <Link to="/login">Sign in here</Link>
						</p>
					</div>
				</form>
			</FormContainer>
		</>
	);
};
export default SignupScreen;
