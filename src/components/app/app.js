import React, {Component} from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
// import ItemList from '../itemList';
// import ItemDetails from '../itemDetails';
import GotService from '../../services/gotService';

import './app.css';
import CharacterPage from '../pages/characterPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';

export default class App extends Component {
	gotService = new GotService();

	state = {
		showRandomChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		});
	}

	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar
			};
		});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}

		const char = this.state.showRandomChar ? <RandomChar /> : null;

		return (
			<>
				<Container>
					<Header />
				</Container>
				<Container>
					<Row>
						<Col lg={{ size: 5, offset: 0 }}>
							{char}
							<button className="toggle-btn"
								onClick={this.toggleRandomChar}>
									Toggle random character
							</button>
						</Col>
					</Row>
					<CharacterPage />
					<BooksPage />
					<HousesPage />
					{/* <Row>
						<Col md='6'>
							<ItemList
								onCharSelected={this.onItemSelected}
								getData={this.gotService.getAllBooks}
								renderItem={item => item.name}
							/>
						</Col>
						<Col md='6'>
							<ItemDetails itemId={this.state.selectedChar} />
						</Col>
					</Row>
					<Row>
						<Col md='6'>
							<ItemList
								onCharSelected={this.onItemSelected}
								getData={this.gotService.getAllHouses}
								renderItem={item => item.name}
							/>
						</Col>
						<Col md='6'>
							<ItemDetails itemId={this.state.selectedChar} />
						</Col>
					</Row> */}
				</Container>
			</>
		);
	}
};