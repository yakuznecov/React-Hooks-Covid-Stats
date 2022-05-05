import { useGetCountries } from '../lib/hooks';

export default function Index() {
	const data = useGetCountries();
	console.log(data);
	return (
		<div>
			<p>Countries</p>
		</div>
	);
}
