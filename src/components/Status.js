import React, {Component} from "react";

class Status extends Component {
	/* Composant pour le choix du statut*/
	render() {
		return <div className="choix-status-container">
			{this.props.choixStatus.map( (status) => (
				<div className="choix-status-input">
					<label className = "container">
						<input
							className="status" 
							name="status" type="radio"
							value={status}
							defaultChecked={ (status=='salarié')}
							onChange ={ (evnt)=> ( this.props.setStatus(evnt.target.value) )} 
						/>
						<span className="checkmark"></span>
						<span>{status}</span>
					</label>
				</div>
			))}
		</div>;
	}
}

export default Status;