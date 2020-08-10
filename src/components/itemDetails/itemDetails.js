import React, { Component } from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
	// console.log(field);
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span className="term">{label}</span>
			<span>{item[field]}</span>
		</li>
	)
};

export {Field};

export default class ItemDetails extends Component {

	gotService = new GotService();

	state = {
		item: null,
		showItemInfo: false,
		error: false
	}

	componentDidMount() {
		this.updateItem();
		this.setState({
			showItemInfo: true
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.setState({
				showItemInfo: false
			});
			this.updateItem();
		}
	}

	updateItem() {
		const {itemId, getData} = this.props;

		if (!itemId) {
			return;
		}
		getData(itemId)
			.then(item => {
				this.setState({
					item,
					showItemInfo: true
				});
			})
			.catch(() => this.componentDidCatch());
		// this.foo.bar = 0;
	}

	componentDidCatch() {
		this.setState({
			error: true,
			item: null,
			showItemInfo: false,
		});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />;
		}
		
		if (!this.state.showItemInfo) {
			return <Spinner />;
		}

		if (!this.state.item) {
			return <span className="select-error">Please select a character</span>
		}

		const {item} = this.state;
		const {name} = item;

		return (
			<div className="char-details rounded">
				<h4>{name}</h4>
				<ul className="list-group list-group-flush">
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, {item});
						})
					}
				</ul>
			</div>
		);
	}
}