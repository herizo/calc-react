import React, {Component} from "react";

class Settings extends Component {
  
  
	render(){
		return(
    <div> 
      <div className="options-input">
        <label> Temp de travail {this.props.workHour*10} %</label>
				<input id="heure-travail" type="range" min="1" max="10" list="tickmarks" value={this.props.workHour} onChange = {(e)=> ( this.props.setWorkHour (e.target.value) )} />
          <datalist id="tickmarks">
            <option value="0" label="0%"></option>
            <option value="10"></option>
            <option value="20"></option>
            <option value="30"></option>
            <option value="40"></option>
            <option value="50" label="50%"></option>
            <option value="60"></option>
            <option value="70"></option>
            <option value="80"></option>
            <option value="90"></option>
            <option value="100" label="100%"></option>
          </datalist>
			</div>
      <div className ="choix-nbmois-prime-container">
        { Object.keys(this.props.options.moisPrimeOpt).map( function (key , index)  {
            let value = this.props.options.moisPrimeOpt[key] ;
            return (
            <div className="choix-status-input">
              <label className = "container">
						    <input className="status" name="nbmois-prime" type="radio"  value={value} />
						    <span className="checkmark"></span>
						    <span>{key}</span>
					    </label> 
            </div>);
        } , this)}
       
      </div>
      <div className="options-input">
        <label for="taux-prelevement"> Taux de prelevement a la source {this.props.tauxPrelevement} %</label>
        <input name="taux-prelevement" id="taux-prelevement" type="range" value={this.props.tauxPrelevement} onChange={ (e) => ( this.props.setTauxPrelevement(e.target.value))}/>
      </div>
      <div className ="estimation-salaire">  
        <div className= "ligne">
          <div className = "input-salaire estimation-mensuel">
            <label >Mensuel net apres impôts</label>
            <input type="text" value={this.props.salaire.mensuel.net} onChange={this.props.salaire.mensuel.setNet} />
          </div>
          <div className = "input-salaire estimation-annuel">
            <label >Annuel net apres impôts</label>
            <input type="text" value={this.props.salaire.annuel.net} onChange={this.props.salaire.annuel.setNet} />
          </div>
        </div>
      </div>
    </div>);
	}
}

export default Settings;
