//GENERAMOS LAS CARD FILTRANDO POR FECHA
let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("cardPast")
let pastCard=dataCards.events.filter(event=>comparaFecha(fechaActual,event))
function comparaFecha(fechaActual,fechaEvento){
  let fechaEvent= new Date(fechaEvento.date)
  return fechaEvent<fechaActual
}




cargarCards(pastCard,conteinerCard)


function cargarCards(pastCard,contenedor){
  conteinerCard.innerHTML=""
  let fragmento=document.createDocumentFragment()
  for(card of pastCard){
     let cardDiv=document.createElement("div")
    cardDiv.classList.add("card", "mb-3")
    cardDiv.style.width="25rem"
    cardDiv.innerHTML=`<img src=${card.image} class="card-img-top h-50 border-bottom" alt=${card.name.split(" ").join("_")}>
    <div class="card-body d-flex flex-column bg-black">
      <h5 class="card-title text-white">${card.name}</h5>
     <p class="text-white">${card.description}</p>
     <p class="text-white">$${card.price}</p>
      <a href="./details.html" class="btn text-white  color-btn align-self-end">Ver más</a>
    </div>`
    fragmento.appendChild(cardDiv)
  
  }
  contenedor.appendChild(fragmento)
  }

  //GENERAMOS LOS CHECK 
let conteinerCheck=document.getElementById("pastCheck")
let categorysFilter=pastCard.map(event=>event.category);
categorysFilter=categorysFilter.filter((valor, indice) => {
  return categorysFilter.indexOf(valor) === indice;
});

cargarCheck(categorysFilter,conteinerCheck)


function cargarCheck(categorys,conteiner){
  let fragmento=document.createDocumentFragment()
  for(check of categorys){
    let checkDiv=document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  conteiner.appendChild(fragmento)
  }
  
//hacemos filtrado con check
let checkbox=document.querySelectorAll("input[type=checkbox]")
 
 
let checkeds=[]
checkbox.forEach(categoria=>categoria.addEventListener('change', filtrarCheck))

function filtrarCheck(e) {
  if (this.checked) {
checkeds.push(e.target.value)

//console.log(checkeds)
   
  } else {
    checkeds=checkeds.filter(event=>event!==e.target.value)
   //console.log(checkeds)
   
  }
  conteinerCard.innerHTML=""

if(checkeds.length>0){
  cargarCards(pastCard.filter(event=>validaEvento(event,checkeds)),conteinerCard)
}else{
  cargarCards(pastCard,conteinerCard)
}
} 


//console.log(checkeds)



function validaEvento(evento,arregloCategorias){
return arregloCategorias.find(categoria=>categoria==evento.category.split(" ").join("_"));
}
  

//Search


const search=document.getElementById("search");

search.addEventListener("keyup",buscarTitulo)

function buscarTitulo(e){
  if(e.target.value!="") {
    if (checkeds.length > 0) {
      let cardChecked = pastCard.filter(event => validaEvento(event, checkeds));
      let tituloCard = cardChecked.filter(event => event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
      if (tituloCard.length == 0) {
        /* let p=document.createElement("p")
         p.textContent="El titulo ingresado no existe"
         conteinerCard.appendChild(p)*/
        alert("El titulo ingresado no existe")
        cargarCards(cardChecked,conteinerCard)
      }
      else {
          cargarCards(tituloCard,conteinerCard)
      }
    } else {
      let tituloCard = pastCard.filter(event=> event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
          
      if (tituloCard.length == 0) {
        /* let p=document.createElement("p")
         p.textContent="El titulo ingresado no existe"
         conteinerCard.appendChild(p)*/
        alert("El titulo ingresado no existe")
        cargarCards(pastCard,conteinerCard)
      }
      else {
      cargarCards(tituloCard,conteinerCard)
      }
    }}else{
      if(checkeds.length > 0){
  
        let cardChecked = pastCard.filter(event => validaEvento(event, checkeds));
        cargarCards(cardChecked,conteinerCard)
      }
      else{cargarCards(pastCard,conteinerCard)}
    }
}