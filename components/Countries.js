import { useState } from 'react';
import { useGetCountries } from '../lib/hooks';
import styled from 'styled-components';
import CountryData from './CountryData';

const Countries = () => {
	const [country, setCountry] = useState('');
	const [countrySelected, setCountrySelected] = useState('');
	const [countryOptions, setCountryOptions] = useState([]);
	const { data: countries } = useGetCountries(); // сменили переменную, деструктуризация

	const handleClick = (name) => {
		setCountry(name);
		setCountryOptions([]);
		setCountrySelected(name);
	};

	const handleInput = (e) => {
		if (e.target.value) {
			setCountry(e.target.value);
			const options = countries.filter((res) => {
				const regex = new RegExp(e.target.value, 'gi');
				return res.name.match(regex);
			});
			setCountryOptions(options);
		} else {
			setCountry('');
			setCountryOptions([]);
		}
	};

	const renderCountry = (flagUrl, name, id) => {
		return flagUrl ? (
			<div className='option' key={id} onClick={() => handleClick(name)}>
				<img src={flagUrl} alt={name} />
				<span>{name}</span>
			</div>
		) : null;
	};

	return (
		<Container>
			<div className='form'>
				<h2>Countries</h2>
				<input className='input' type='text' value={country} onChange={handleInput} />
				{!!countryOptions.length && (
					<div>
						{countryOptions.map((res) => renderCountry(res.media.flag, res.name, res.id)).slice(0, 10)}
					</div>
				)}
			</div>
			{countrySelected && <CountryData country={countrySelected} />}
		</Container>
	);
};

export default Countries;

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	max-width: 610px;
	margin: 50px auto 0;
	h2 {
		color: #800;
	}
	.form {
		width: 210px;
		min-height: 32px;
		border: 1px solid #ccc;
		border-radius: 2px;
		padding: 8px;
		font-size: 16px;
	}
	.input {
		border: 1px solid #424242;
		border-radius: 4px;
		padding: 4px 8px;
		width: 150px;
	}
	.option {
		border-bottom: 1px solid #eee;
		padding: 8px;
		cursor: pointer;
		img {
			max-width: 30px;
			margin-right: 10px;
		}
	}
`;
