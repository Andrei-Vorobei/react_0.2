import React, {Component} from 'react';
// import { Col, Row } from 'reactstrap';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class HousesPage extends Component {
	gotService = new GotService();

	state = {
		selectedHouse: null,
		error: false
	}

	onHouseSelected = (id) => {
		this.setState({
			selectedHouse: id,
		});
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onHouseSelected}
				getData={this.gotService.getAllHouses}
				renderItem={({name}) => name}
			/>
		);

		const houseDetails = (
			<ItemDetails
				itemId={this.state.selectedHouse}
				getData={this.gotService.getHouse}
			>
				<Field field='name' label='Name' />
				<Field field='region' label='Region' />
				<Field field='titles' label='Titles' />
				<Field field='words' label='Words' />
				<Field field='coatOfArms' label='CoatOfArms' />
				<Field field='ancestralWeapons' label='AncestralWeapons' />
			</ItemDetails>
		);

		return (
			<RowBlock
				left={itemList}
				right={houseDetails}
			/>
		)
	}
}