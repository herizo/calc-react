(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,a,t){},16:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t(0),l=t.n(r),s=t(3),i=t.n(s),o=t(4),u=t.n(o);t(15);var c=class extends r.Component{render(){return Object.keys(this.props.salaire).map((e,a)=>l.a.createElement("div",{className:"ligne"},l.a.createElement("div",{className:"input-salaire brut"},l.a.createElement("label",{for:e+"-brut"},l.a.createElement("span",null,e," brut")),l.a.createElement("input",{name:e+"-brut",id:e+"-brut",value:Math.round(this.props.salaire[e].brut),onChange:this.props.salaire[e].setBrut})),l.a.createElement("div",{className:"input-salaire net"},l.a.createElement("label",{for:e+"-net"},l.a.createElement("span",null,e," net")),l.a.createElement("input",{name:e+"-net",id:e+"-net",value:this.props.salaire[e].net,onChange:this.props.salaire[e].setNet}))))}};var m=class extends r.Component{render(){return l.a.createElement("div",{className:"choix-status-container"},this.props.choixStatus.map(e=>l.a.createElement("div",{className:"choix-status-input"},l.a.createElement("label",{className:"container"},l.a.createElement("input",{className:"status",name:"status",type:"radio",value:e,defaultChecked:"salari\xe9"==e,onChange:e=>this.props.setStatus(e.target.value)}),l.a.createElement("span",{className:"checkmark"}),l.a.createElement("span",null,e)))))}};var p=class extends r.Component{render(){return l.a.createElement("div",null,l.a.createElement("div",{className:"options-input"},l.a.createElement("label",null," Temp de travail ",this.props.workHour," %"),l.a.createElement("input",{id:"heure-travail",type:"range",list:"tickmarks",value:this.props.workHour,onChange:e=>this.props.setWorkHour(e.target.value)}),l.a.createElement("datalist",{id:"tickmarks"},l.a.createElement("option",{value:"0",label:"0%"}),l.a.createElement("option",{value:"10"}),l.a.createElement("option",{value:"20"}),l.a.createElement("option",{value:"30"}),l.a.createElement("option",{value:"40"}),l.a.createElement("option",{value:"50",label:"50%"}),l.a.createElement("option",{value:"60"}),l.a.createElement("option",{value:"70"}),l.a.createElement("option",{value:"80"}),l.a.createElement("option",{value:"90"}),l.a.createElement("option",{value:"100",label:"100%"}))),l.a.createElement("div",{className:"choix-nbmois-prime-container"},Object.keys(this.props.options.moisPrimeOpt).map(function(e,a){let t=this.props.options.moisPrimeOpt[e];return l.a.createElement("div",{className:"choix-status-input"},l.a.createElement("label",{className:"container"},l.a.createElement("input",{className:"status",name:"nbmois-prime",type:"radio",value:t}),l.a.createElement("span",{className:"checkmark"}),l.a.createElement("span",null,e)))},this)),l.a.createElement("div",{className:"options-input"},l.a.createElement("label",{for:"taux-prelevement"}," Taux de prelevement a la source ",this.props.tauxPrelevement," %"),l.a.createElement("input",{name:"taux-prelevement",id:"taux-prelevement",type:"range",value:this.props.tauxPrelevement,onChange:e=>this.props.setTauxPrelevement(e.target.value)})),l.a.createElement("div",{className:"estimation-salaire"},l.a.createElement("div",{className:"ligne"},l.a.createElement("div",{className:"input-salaire estimation-mensuel"},l.a.createElement("label",null,"Mensuel net apres imp\xf4ts"),l.a.createElement("input",{type:"text",value:this.props.salaire.mensuel.net,onChange:this.props.salaire.mensuel.setNet})),l.a.createElement("div",{className:"input-salaire estimation-annuel"},l.a.createElement("label",null,"Annuel net apres imp\xf4ts"),l.a.createElement("input",{type:"text",value:this.props.salaire.annuel.net,onChange:this.props.salaire.annuel.setNet})))))}};const v=document.getElementById("root");u.a.render(l.a.createElement(function(){let e,a=Object(r.useState)(""),t=Object(n.a)(a,2),s=t[0],o=t[1],u=Object(r.useState)("salari\xe9"),v=Object(n.a)(u,2),d=v[0],E=v[1],h=0;e=0;let b={"contrat salari\xe9 . r\xe9mun\xe9ration . brut de base":s,"contrat salari\xe9 . statut cadre":d,"imp\xf4t . m\xe9thode de calcul":"bar\xe8me standard"};var N=Math.round(i.a.evaluate("contrat salari\xe9 . r\xe9mun\xe9ration . net apr\xe8s imp\xf4t",b));let g={horaire:{brut:e,net:h,setBrut:a=>e=Math.round(a.target.value),setNet:e=>h=Math.round(e.target.value)},mensuel:{brut:s,net:N,setBrut:e=>o(Math.round(e.target.value))},annuel:{brut:12*s,net:12*N,setBrut:e=>o(e.target.value/12),setNet:e=>N=e.target.value/12}},x={"salari\xe9":"Non-cadre","salari\xe9 cadre":"Cadre","fonction public":"Public","ind\xe9pendant":"Ind\xe9","portage salarial":"Port"}[d],k=new Object({});Object(r.useState)(""),k.moisPrimeOpt={"12 mois":12,"13 mois":13,"14 mois":14,"15 mois":15,"16 mois":16};let O=Object(r.useState)(100),j=Object(n.a)(O,2),C=j[0],f=j[1],w=Object(r.useState)(0),P=Object(n.a)(w,2),y=P[0],S=P[1];return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"entree-salaire"},l.a.createElement("span",{id:"status-travailleur"},x),l.a.createElement(c,{salaire:g,setBrut:o}),l.a.createElement(m,{choixStatus:["salari\xe9","salari\xe9 cadre","fonction public","ind\xe9pendant","portage salarial"],setStatus:E})),l.a.createElement("div",{className:"options"},l.a.createElement(p,{salaire:g,options:k,workHour:C,setWorkHour:f,tauxPrelevement:y,setTauxPrelevement:S})))},null),v)},5:function(e,a,t){e.exports=t(16)}},[[5,1,2]]]);
//# sourceMappingURL=main.e9de82a4.chunk.js.map