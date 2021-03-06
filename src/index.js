import React, { useState , useEffect  } from "react";
import Lib from "mon-entreprise";
import ReactDOM from "react-dom";
import './style.css';
import BrutVersNet from "./components/BrutaNet";
import Status from "./components/Status" ;
import Settings from "./components/Settings";

function setToInteger(val) {
  if (isNaN(val)) {;
    return 0 ;
  }
  val= (Math.ceil(val) < 0 ) ? 0 : Math.ceil(val);
  return val;
}

function floorAt(val){
  return Number( val.toFixed(2));
  
}

function App() {

  let [brut, setBrut] = useState("");

  let [status , setStatus] = useState("salarié");

  let [tauxPrelevement , setTauxPrelevement ] = useState(0.0);

  var [net, setNet] = useState( 0 );

  let [netApImpot , setNetApImpot ] = useState(0);

  let [taux_reduction , setTauxReduction] = useState(22) ; // salarié non cadre par defaut

  let [statut_cadre, setStatutCadre] = useState("non");

  useEffect (
    // Recalcul quand l'utilisateur change de statut .
    function (){
      if (status == "salarié cadre" ) {
        // si le statut est salarie cadre.
        setTauxReduction(25); // -25%
        setNet(calcul_net(brut));
      }
      else if (status == "salarié") {
        // si le statut est simple salarié.
        setTauxReduction(22); // -22%
        setNet(calcul_net(brut));
      }
      else if (status == "fonction public"){
        // si le statut est fonctionnaire.
        setTauxReduction(15); // -15%
        setNet(calcul_net(brut));

      }
      else if (status == "Proféssion Libérale"){
        // si le statut est independant.
        setTauxReduction(45); // -45%
        setNet(calcul_net(brut));
      }
      else if (status == "portage salarial"){
        // si le statut est en portage salarial.
        setTauxReduction(51); // -51%
        setNet(calcul_net(brut));
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
    let salaire_brut  = (net * 100) / (100 - taux_reduction);
    return setToInteger(salaire_brut) ;
  };

  var calcul_net = function (brut){
    /* Calcul valeur salaire net a partir du salaire brut (valeur mensuel)*/
    console.log(workHour);
    let salaire_net = brut - ( (brut * taux_reduction)/ 100);
    return setToInteger(salaire_net);
  };
  
  var calcul_taux_prelevement  = function (){
    let taux= 0 ;
    return taux ;
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
    setTauxPrelevement(calcul_taux_prelevement());
  }


  /* taux horaire pour l'individu */
  let [taux_horaire_base,setTauxHoraireBase] = useState(Math.round(
    Lib.evaluate("contrat salarié . temps de travail" , donnéesEntrée)
  ));
  

  let [workHour , setWorkHour] = useState(10);
  let [taux_horaire,setTauxHoraire] = useState(Math.round((taux_horaire_base*(workHour*10))/100 ));

  

  let salaire = {
    "horaire" : { 
      "brut" : floorAt( brut / taux_horaire) ,
      "net"  : floorAt( net  / taux_horaire) ,
      "setBrut" : (e) => ( 
        update_value(
          "brut",
          (e.target.value*taux_horaire)
        ) 
      ),
      "setNet"  : (e) => (
        update_value(
          "net" ,
          (e.target.value*taux_horaire)
        )
      )
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
    "Proféssion Libérale" ,
    "portage salarial"
  ];

  let mapStatus = {
    "salarié":"Non-cadre", 
    "salarié cadre":"Cadre",
    "fonction public" :"Public",
    "Proféssion Libérale":"Indé",
    "portage salarial":"Port"
  };

  let valstatus = mapStatus[status];

  /* */
  let options = new Object({});
  options["moisPrimeOpt"] ={
    "12 mois":12 ,
    "13 mois":13 ,
    "14 mois":14 ,
    "15 mois":15 ,
    "16 mois":16
  };
  
  let modificationTauxHoraire = function (newWorkHour) {
    let montantBrutHeure = salaire.horaire.brut ;
    // Taux horaire 100 %  =  152 ;
    

    setWorkHour(newWorkHour);
    setTauxHoraire(Math.round((taux_horaire_base*(workHour*10))/100 ))
    salaire.horaire.setBrut({target: { value : montantBrutHeure}});

  };

  /* Modification de la formule de calcule selon l'entrée de l'utilisateur */
  return (
  <div className="App">

    <div className = "entree-salaire">
      <span id="status-travailleur" >{valstatus}</span>
      <BrutVersNet salaire = {salaire} />
      <Status choixStatus = {choixStatus} setStatus={setStatus}/>
    </div>

    <div className = "options">
      <Settings 
          netApImpot ={netApImpot} 
          salaire= {salaire} options={options}
          workHour={workHour}
          setWorkHour = {setWorkHour}
          tauxPrelevement = {tauxPrelevement}
          setTauxPrelevement={setTauxPrelevement}
          modificationTauxHoraire = {modificationTauxHoraire}
      />
    </div>

  </div>
  );

}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);