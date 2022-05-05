import { useState, useEffect } from 'react';

const useGetCountries = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://api.sampleapis.com/countries/countries')
				.then((res) => res.json())
				.catch((err) => console.log(err));

			setData(response);
		};
		fetchData();
	}, []);

	return {
		data,
	};
};

export default function Index() {
	const data = useGetCountries();
	return (
		<div>
			<p>Countries</p>
		</div>
	);
}
