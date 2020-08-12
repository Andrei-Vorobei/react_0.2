import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import {CharacterPage, BooksPage, HousesPage, BooksItem, IndexPage} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';

export default class App extends Component {

	state = {
		error: false
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

		return (
			<Router>
				<div className="app">
					<Container>
						<Header />
					</Container>
					<Container>
						<Route path="/" component={IndexPage} />
						{/* <Route path="/" exact component={() => <h1>Welcome to GOT DB</h1>} /> */}
						<Route path="/characters" component={CharacterPage} />
						<Route path="/houses" component={HousesPage} />
						<Route path="/books" exact component={BooksPage} />
						<Route path="/books/:id" render={
							({match}) => {
								const {id} = match.params;

								return <BooksItem bookId={id} />
							} 
						} />
					</Container>
				</div>
			</Router>
		);
	}
};