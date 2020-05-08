import React, { useState , useEffect  } from "react";
import Lib from "mon-entreprise";
import ReactDOM from "react-dom";
import './style.css';
import BrutVersNet from "./components/BrutaNet";
import Status from "./components/Status" ;
import Settings from "./components/Settings";

function setToInteger(val) {
  if (isNaN(val)) {
    return 0 ;

  }
  val= (Math.ceil(val) < 0 ) ? 0 : Math.ceil(val);
  return val;
}

function floorAt(inp , floor){
  return inp-(inp%floor);
}

function App() {

  let [brut, setBrut] = useState("");

  let [status , setStatus] = useState("salarié");

  let hbrut, hnet = 0 ;

  hbrut=0;

  let [statut_cadre, setStatutCadre] = useState("non");

  useEffect (
    // Recalcul quand l'utilisateur change de statut .
    function (){
      if (status == "salarié cadre" ) {
        // si le statut est salarie cadre.
        setStatutCadre("oui");
        setNet(calcul_net(brut));
        let taux = -25; // -25%
      }
      else if (status == "salarié") {
        // si le statut est simple salarié.
        setStatutCadre("non");
        setNet(calcul_net(brut));
        let taux = -22; // -22%
      }
      else if (status == "fonction public"){
        // si le statut est fonctionnaire.
        let taux = -15; // -15%

      }
      else if (status == "indépendant"){
        // si le statut est independant.
        let taux = -45; // -45%
      }
      else if (status == "portage salarial"){
        // si le statut est en portage salarial.
        let taux = -51; // -51%
      }

    }
  );

  let donnéesEntrée = {
    "contrat salarié . rémunération . brut de base": brut,
    "contrat salarié . statut cadre" : status,
    "impôt . méthode de calcul" : "barème standard"
  };

  var status_contrat = "contrat salarié";
  
  /**/
  var calcul_brut = function (net) {
    /* Calcul valeur de salaire brut a partir du salaire net (valeur mensuel)*/
    let calcData  = {
      "contrat salarié . statut cadre": statut_cadre,
      "contrat salarié . rémunération . net" : net,
    };
    let salaire_brut  = Math.round (Lib.evaluate(status_contrat+" . rémunération . brut de base", calcData));

    return setToInteger(salaire_brut) ;
  };

  var calcul_net = function (brut){
    /* Calcul valeur salaire net a partir du salaire brut (valeur mensuel)*/
    let calcData = {
      "contrat salarié . statut cadre": statut_cadre,
      "contrat salarié . rémunération . brut de base": brut,
    };

    let salaire_net = Math.round(Lib.evaluate(status_contrat + " . rémunération . net", calcData));

    return setToInteger(salaire_net);
  };

  var update_value = function (variable , value) {
    if (variable == "brut" ){
      setBrut( setToInteger(value))
      setNet ( calcul_net(setToInteger(value)) );
    }
    else if (variable == "net"){
      setNet ( setToInteger(value));
      setBrut( calcul_brut(setToInteger(value)) );
    }
  }
  
  /*let netimpot = Lib.evaluate("contrat salarié . rémunération . net après impôt" , donnéesEntrée);
  let smic = Lib.evaluate("contrat salarié . SMIC");*/
  var [net, setNet] = useState( 0 );
  /* taux horaire pour l'individu */
  let [taux_horaire,setTauxHoraire] = useState(Math.round(Lib.evaluate("contrat salarié . temps de travail" , donnéesEntrée)));

  let salaire = {
    "horaire" : { "brut" : floorAt(brut/taux_horaire , 0.01) ,"net" : floorAt(net/taux_horaire ,0.01),
      "setBrut" : (e) => (update_value("brut",e.target.value*taux_horaire) ),
      "setNet"  : (e) => (update_value("net" ,e.target.value*taux_horaire) )
    },

    "mensuel" : {"brut" : brut  , "net" : net  ,
      "setBrut" : (e) => ( update_value("brut", e.target.value) ),
      "setNet"  : (e) => ( update_value("net" , e.target.value) )
    },

    "annuel"  : {"brut" : brut*12  , "net" : net*12 ,
      "setBrut" : (e) => ( update_value("brut" , e.target.value/12) ),
      "setNet"  : (e) => ( update_value("net" , e.target.value/12)  )
    }
  };

  /* Variable lié au status */
  
  let choixStatus = [
    "salarié" ,
    "salarié cadre" ,
    "fonction public",
    "indépendant" ,
    "portage salarial"
  ];

  let mapStatus = {
    "salarié":"Non-cadre", 
    "salarié cadre":"Cadre",
    "fonction public" :"Public",
    "indépendant":"Indé",
    "portage salarial":"Port"
  };

  let valstatus = mapStatus[status];

  /* */
  let options = new Object({});
  options["moisPrimeOpt"] =  {"12 mois":12 , "13 mois" : 13 , "14 mois" : 14 , "15 mois" : 15 , "16 mois" : 16};
  let [workHour , setWorkHour] = useState(10);
  let [tauxPrelevement , setTauxPrelevement] = useState(0);

  /* Modification de la formule de calcule selon l'entrée de l'utilisateur */
  return (
  <div className="App">
    <div className = "entree-salaire">
      <span id="status-travailleur" > {valstatus}</span>
      <BrutVersNet salaire = {salaire} />
      <Status choixStatus = {choixStatus} setStatus={setStatus}/>
    </div>
    <div className = "options">
      <Settings salaire= {salaire} options={options} workHour={workHour} setWorkHour = {setWorkHour} tauxPrelevement = {tauxPrelevement} setTauxPrelevement={setTauxPrelevement}/>
    </div>
  </div>
  );

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);