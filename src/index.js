import React, { useState } from "react";
import Lib from "mon-entreprise";
import ReactDOM from "react-dom";
import './style.css';
import BrutVersNet from "./components/BrutaNet";
import Status from "./components/Status" ;
import Settings from "./components/Settings";


function App() {

  let [brut, setBrut] = useState("");  

  let hbrut, hnet, annuelbrut, annuelnet;

  hbrut=0;
  let donnéesEntrée = {
    "contrat salarié . rémunération . brut de base": brut,
    "contrat salarié . statut cadre" : status,
    "impôt . méthode de calcul" : "barème standard"
  };


  /*let netimpot = Lib.evaluate("contrat salarié . rémunération . net après impôt" , donnéesEntrée);
  let smic = Lib.evaluate("contrat salarié . SMIC");*/

  var net = Math.round(Lib.evaluate("contrat salarié . rémunération . net après impôt", donnéesEntrée));
  /*let setNet = function (value ) {
    net = value*-1;
    let newBrut = Math.round(Lib.evaluate("contrat salarié . rémunération . brut de base . équivalent temps plein", datacalcul)));
    setBrut( newBrut);
  }*/
  let salaire = {
    "horaire" : { "brut" : hbrut  , "net" : hnet ,
      "setBrut" : (e) => ( hbrut = Math.round(e.target.value) ),
      "setNet"  : (e) => ( hnet  = Math.round(e.target.value) )
    },
    "mensuel" : {"brut" : brut  , "net" : net  ,
      "setBrut" : (e) => ( setBrut(Math.round(e.target.value)) ),
      //"setNet"  : (e) => ( setNet(e.target.value) ) 
    },
    "annuel"  : {"brut" : brut*12  , "net" : net*12 ,
      "setBrut" : (e) => ( setBrut( e.target.value/12 )),
      "setNet"  : (e) => ( net =e.target.value/12 )
    }
  };

  /* Variable lié au status */
  let [status , setStatus] = useState("salarié");
  let choixStatus = ["salarié" , "salarié cadre" ,"fonction public", "indépendant" , "portage salarial"];
  let mapStatus = {'salarié':'Non-cadre'  , "salarié cadre":"Cadre" , "fonction public" : "Public" , "indépendant" : "Indé" , "portage salarial":"Port"};
  let valstatus = mapStatus[status];

  /**/
  let options = new Object({});
  let heure_de_travail, set_heure_de_travail = useState("");
  options["moisPrimeOpt"] =  {"12 mois":12 , "13 mois" : 13 , "14 mois" : 14 , "15 mois" : 15 , "16 mois" : 16};
  let [workHour , setWorkHour] = useState(100);
  let [tauxPrelevement , setTauxPrelevement] = useState(0);


  /* Modification de la formule de calcule selon l'entrée de l'utilisateur */


  return (
  <div className="App">
    <div className = "entree-salaire">
      <span id="status-travailleur">{valstatus}</span>

      <BrutVersNet salaire = {salaire} setBrut ={setBrut}/>
      <Status choixStatus = {choixStatus} setStatus={setStatus} />
    </div>
    <div className = "options">
      <Settings salaire= {salaire} options={options} workHour={workHour} setWorkHour = {setWorkHour} tauxPrelevement = {tauxPrelevement} setTauxPrelevement={setTauxPrelevement}/>
    </div>
  </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);