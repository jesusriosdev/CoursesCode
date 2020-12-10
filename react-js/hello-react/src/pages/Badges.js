import React from "react";
import { Link } from "react-router-dom";

import "./styles/Badges.css";
import confLogo from "../images/badge-header.svg";
import BadgeList from "../components/BadgeList";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import MiniLoader from "../components/MiniLoader";

import api from "../api";

class Badges extends React.Component {
	constructor(props) {
		console.log("1. constructor");

		super(props);

		this.state = {
			loading: true,
			error: null,
			data: undefined,
		};
	}

	componentDidMount() {
		this.fetchData();

		this.intervalId = setInterval(() => {
			this.fetchData();
		}, 5000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}

	async fetchData() {
		this.setState({
			loading: true,
			error: null,
		});

		try {
			const data = await api.badges.list();
			// const data = [];
			this.setState({
				loading: false,
				data: data,
			});
		} catch (error) {
			this.setState({
				loading: false,
				error: error,
			});
		}
	}

	render() {
		if (this.state.loading === true && this.state.data === undefined) {
			return <PageLoading />;
		}

		if (this.state.error) {
			return <PageError error={this.state.error} />;
		}

		console.log("2/4. render");
		return (
			<React.Fragment>
				<div className="Badges">
					<div className="Badges__hero">
						<div className="Badges__container">
							<img className="Badges_conf-logo" src={confLogo} alt="Conf Logo" />
						</div>
					</div>
				</div>

				<div className="Badges__container">
					<div className="Badges__buttons">
						<Link to="/badges/new" className="btn btn-primary">
							New Badge
						</Link>
					</div>

					<BadgeList badges={this.state.data} />

					{this.state.loading && <MiniLoader />}
				</div>
			</React.Fragment>
		);
	}

}

export default Badges;
