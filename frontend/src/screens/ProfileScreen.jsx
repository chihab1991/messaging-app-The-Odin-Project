import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { setCredentials } from "./../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const ProfileScreen = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);
	const [updateUser, { isLoading }] = useUpdateUserMutation();
	useEffect(() => {
		setFirstName(userInfo.firstName);
		setLastName(userInfo.lastName);
		setEmail(userInfo.email);
	}, [userInfo.firstName, userInfo.lastName, userInfo.email]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
		} else {
			try {
				const res = await updateUser({
					_id: userInfo._id,
					firstName,
					lastName,
					email,
					password,
				}).unwrap();
				dispatch(setCredentials({ ...res }));
				toast.success("Profile Updated");
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
					<button type="submit">Update</button>
				</form>
			</FormContainer>
		</>
	);
};
export default ProfileScreen;
