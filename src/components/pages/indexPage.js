import React, {Component} from 'react';
import { Col, Row } from 'reactstrap';
import RandomChar from '../randomChar';


export default class IndexPage extends Component {

	state = {
		showRandomChar: true,
		error: false
	}

	toggleRandomChar = () => {
		this.setState((state) => {
			return {
				showRandomChar: !state.showRandomChar
			};
		});
	}

	render() {
		const char = this.state.showRandomChar ? <RandomChar /> : null;

		return (

			<Row>
				<Col lg={{ size: 5, offset: 0 }}>
					{char}
					<button className="toggle-btn"
						onClick={this.toggleRandomChar}>
							Toggle random character
					</button>
				</Col>
			</Row>
		)
	}
}