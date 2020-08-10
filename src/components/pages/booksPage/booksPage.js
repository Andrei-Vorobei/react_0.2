import React, {Component} from 'react';
// import { Col, Row } from 'reactstrap';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';

export default class BooksPage extends Component {
	gotService = new GotService();

	state = {
		selectedBook: null,
		error: false
	}

	onBookSelected = (id) => {
		this.setState({
			selectedBook: id,
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
				onItemSelected={this.onBookSelected}
				getData={this.gotService.getAllBooks}
				renderItem={({name}) => name}
			/>
		);

		const bookDetails = (
			<ItemDetails
				itemId={this.state.selectedBook}
				getData={this.gotService.getBook}
			>
				<Field field='name' label='Name' />
				<Field field='numberOfpages' label='Number of pages' />
				<Field field='released' label='Released' />
				<Field field='publiser' label='Publiser' />
			</ItemDetails>
		);

		return (
			<RowBlock
				left={itemList}
				right={bookDetails}
			/>
		)
	}
}