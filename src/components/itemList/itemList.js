import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';
// import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function ItemList({getData, onItemSelected, renderItem}) {

	const [itemList, updateList] = useState([]);

	useEffect(() => {
		getData() 
			.then(itemList => {
				updateList(itemList)
			});
	}, []);

	function renderItems(arr) {
		return arr.map((item) => {
			// console.log(item);
			const {id} = item;
			const label = renderItem(item);
			return (
				<li className="list-group-item"
					key={id}
					onClick={() => onItemSelected(id)}>
						{label}
				</li>
			)
		});
	}

	// componentDidCatch() {
	// 	this.setState({
	// 		error: true
	// 	});
	// }

	// if (this.state.error) {
	// 	return <ErrorMessage />;
	// }

	if (!itemList) {
		return <Spinner />;
	}
	
	const items = renderItems(itemList);

	return (
		<ul className="item-list list-group">
			{items}
		</ul>
	);
}

ItemList.defaultProps = {
	onItemSelected: () => {}
}

ItemList.propTypes = {
	onItemSelected: PropTypes.func
}

export default ItemList;