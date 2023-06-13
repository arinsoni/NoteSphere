import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";


const EmailVerify = (props) => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	let i = 0

	useEffect(() => {
		if (i == 0){
		const verifyEmailUrl = async (e) => {
			e.preventDefault();
			props.setProgress(30)
			try {
				const url = `http://localhost:5000/auth/${param.id}/verify/${param.token}`;
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                })
				props.setProgress(60)
                const data = await response.json()
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
			props.setProgress(100)
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