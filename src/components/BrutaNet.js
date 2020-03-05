import React, {Component} from "react";

class BrutVersNet extends Component {
	render () {
		
		return Object.keys( this.props.salaire ).map((key,index)=>(
				<div className="ligne">
					<div className = "input-salaire brut">
						<label for = {key+"-brut"}><span>{key} brut</span></label>
						<input name={key+"-brut"} id={key+"-brut"} value = {Math.round(this.props.salaire[key].brut)} onChange = {this.props.salaire[key].setBrut} />
					</div>
					<div className = "input-salaire net">
						<label for = { key + "-net"}><span>{key} net</span></label>
						<input name={ key + "-net"} id={ key + "-net"} value = {this.props.salaire[key].net } onChange = {this.props.salaire[key].setNet} />
					</div>
				</div>
			));
	}
}

export default BrutVersNet;