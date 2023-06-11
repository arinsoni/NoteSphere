import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	let i = 0

	useEffect(() => {
		if (i == 0){
		console.log("Effect triggered");
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:5000/auth/${param.id}/verify/${param.token}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                })
                const data = await response.json()
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
		i ++
	}
	}, [param]);

	return (
	<>
			{validUrl ? (
				<div >
					
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button >Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default EmailVerify;