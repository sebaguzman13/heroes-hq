import { useState, useEffect } from 'react';
//	components
import HeroesList from './../../components/HeroesList';
import StatCard from './../../components/StatCard';
// team members
import { useSelector } from 'react-redux';
// controller
import { teamPowerStats } from './../../controllers/heroesController';
// constants for strings
import { AVG } from './../../constants';

const biggerStat = (stats) => {
	let bigger = '';
	let value = 0;
	for(let s in stats) {
		if(stats[s] > value) {
			value = stats[s];
			bigger = s;
		}
	}
	return bigger;
}

export const HomeScreen = () => {	
	const [stats, setStats] = useState({});	
	const [avgLook, setAvgLook] = useState({height: [0,0], weight: [0,0]});
	const [bigger, setBigger] = useState('');

	const myTeam = useSelector(state => state.hero.heroes);

	useEffect( () => {
		const {totalPS, avgPhysicals} = teamPowerStats(myTeam);
		setStats(totalPS);
		setAvgLook(avgPhysicals);
	}, [myTeam]);

	 useEffect( () => {
		setBigger(biggerStat(stats));
	 }, [stats])
	
	return (
		<>
		<h1 className="col-12 my-4 team-title">Active Team</h1>
		 <div className="container-fluid mx-auto row" style={{justifyContent: 'space-between'}}>
		{ Object.keys(stats).map( (key, index) => {
					let isMain = false;
					if(key === bigger) {isMain = true;}
		 			return (
		 				<StatCard stat={{name: key, value: stats[key]}} key={key} isMain={isMain} />
		 			)
		 		})
		 	}
		</div>
		<div className="container-fluid row my-4 card mx-auto">
			{ Object.keys(avgLook).map( (key, index) => {
				return (
					<>
						<h3 key={key} className="col-12 col-md-6 my-4 mx-auto card-title text-uppercase" id={key}>{AVG} {key}: <span>{avgLook[key][1].toFixed(2)} { key === 'height' ? 'cm' : 'kg'}</span></h3>
					</>
				)
			})}
		</div>
			<HeroesList />
		</>
	)
};

export default HomeScreen;