import React, {Component} from "react";

class Settings extends Component {
  
  
	render(){
		return(
    <div> 
      <div className="options-input">
        <label> Temp de travail {this.props.workHour*10} %</label>
				<input id="heure-travail" type="range" min="1" max="10" list="tickmarks" value={this.props.workHour} onChange = {(e)=> ( this.props.modificationTauxHoraire (e.target.value) )} />
          
			</div>
      <div className ="choix-nbmois-prime-container">
        { Object.keys(this.props.options.moisPrimeOpt).map( function (key , index)  {
            let value = this.props.options.moisPrimeOpt[key] ;
            return (
            <div className="choix-status-input">
              <label className = "container">
						    <input 
                  className="status"
                  name="nbmois-prime"
                  type="radio"
                  defaultChecked = {(value == 12)}
                  value={value}
                  />
						    <span className="checkmark"></span>
						    <span>{key}</span>
					    </label> 
            </div>);
        } , this)}
       
      </div>
      <div className="options-input">
        <label for="taux-prelevement"> Taux de prelevement a la source {this.props.tauxPrelevement} %</label>
        <input name="taux-prelevement" id="taux-prelevement" type="range" min="0.0" max="43.0" value={this.props.tauxPrelevement} onChange={ (e) => ( this.props.setTauxPrelevement(e.target.value))}/>
      </div>
      <div className ="estimation-salaire">  
        <div className= "ligne">
          <div className = "input-salaire estimation-mensuel">
            <label >Mensuel net apres impôts</label>
            <input type="text" value={this.props.netApImpot} /> 
          </div>
          <div className = "input-salaire estimation-annuel">
            <label >Annuel net apres impôts</label>
            <input type="text" value={this.props.netApImpot} />
          </div>
        </div>
      </div>
    </div>);
	}
}

export default Settings;
