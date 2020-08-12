import React, { Component } from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

export default class ItemList extends Component {

	state = {
		itemList: null,
		error: false
	}

	componentDidMount() {
		const {getData} = this.props;

		getData() 
			.then(itemList => {
				this.setState({
					itemList
				});
			});
	}

	renderItems(arr) {
		return arr.map((item) => {
			// console.log(item);
			const {id} = item;
			const label = this.props.renderItem(item);
			return (
				<li className="list-group-item"
					key={id}
					onClick={() => this.props.onItemSelected(id)}>
						{label}
				</li>
			)
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

		const {itemList} = this.state;
		
		if (!itemList) {
			return <Spinner />;
		}
		
		const items = this.renderItems(itemList);

		return (
			<ul className="item-list list-group">
				{items}
			</ul>
		);
	}
}

ItemList.defaultProps = {
	onItemSelected: () => {}
}

ItemList.propTypes = {
	onItemSelected: PropTypes.func
}