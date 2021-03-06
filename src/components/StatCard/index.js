import { useEffect, useState } from 'react';
import './index.css';

export const StatCard = ({stat, isMain}) => {
	const [mainStatClass, setMainStatClass] = useState('');
	
	useEffect( () => {
		if(isMain) {
			setMainStatClass('main-stat');
		}
	}, [isMain]);

	return (
		<div className={`alkemy-card col-6 col-sm-4 col-md-2 stat ${mainStatClass}`}>
    	<div className="card-body">
        <h3 className="card-title">{stat.value}</h3>
        <h6 className="card-text">{stat.name}</h6>
    	</div>
		</div>
	)
};

export default StatCard;