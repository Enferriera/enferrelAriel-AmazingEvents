//GENERAMOS LAS CARD 
const conteinerCard=document.getElementById("cardHome")


cargarCards(dataCards.events,conteinerCard)


function cargarCards(events,contenedor){
  conteinerCard.innerHTML=""
  let fragmento=document.createDocumentFragment()
 
for(card of events){
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

//GENERAMOS LAS CATEGORYS
const conteinerCheck=document.getElementById("containerCheck")



let categorys=dataCards.events.map(event=>event.category)
let categorysFiltradas=categorys.filter((valor, indice) => {
  return categorys.indexOf(valor) === indice;
})
cargarCheck(categorysFiltradas,conteinerCheck)


function cargarCheck(categorias,contenedor){
  let fragmento=document.createDocumentFragment()
  for(check of categorias){
    let checkDiv=document.createElement("div")//["museo","comida","cine","Food Fair"]
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" type="checkbox" name="category" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  contenedor.appendChild(fragmento)
  }
  

  //filtramos las categorys
let checkbox=document.querySelectorAll("input[type=checkbox]")
 
 
let checkeds=[]
checkbox.forEach(categoria=>{categoria.addEventListener('change', filtrarCheck)})

function filtrarCheck(e) {
  if (this.checked) {
checkeds.push(e.target.value)

console.log(checkeds)
   
  } else {
    checkeds=checkeds.filter(event=>event!==e.target.value)
   //console.log(checkeds)
   
  }
  
if(checkeds.length>0){
cargarCards(dataCards.events.filter(event=>validaEvento(event,checkeds)),conteinerCard)
}else{
  cargarCards(dataCards.events,conteinerCard)
}
} 






function validaEvento(evento,arregloCategorias){
return arregloCategorias.find(categoria=>categoria==evento.category.split(" ").join("_"));
}


//Search


const search=document.getElementById("search");

search.addEventListener("keyup",buscarTitulo)


function buscarTitulo(e){

  if(e.target.value!=""){
  if (checkeds.length > 0) {
    let cardChecked = dataCards.events.filter(event => validaEvento(event, checkeds));
    let tituloCard = cardChecked.filter(event => event.name.toLowerCase().search(e.target.value.toLowerCase().trim())!=-1)
    if (tituloCard.length==0) {
      alert("El titulo ingresado no existe")
      cargarCards(cardChecked,conteinerCard)
    }
    else {
        cargarCards(tituloCard,conteinerCard)
          
    }
  } else {
    let tituloCard = dataCards.events.filter(event=> event.name.toLowerCase().search(e.target.value.toLowerCase().trim())!=-1)
    
    if (tituloCard.length==0) {
      alert("El titulo ingresado no existe")
      cargarCards(dataCards.events,conteinerCard)
    }
    else {
    cargarCards(tituloCard,conteinerCard)

    }
  }
}else{
  if(checkeds.length > 0){

    let cardChecked = dataCards.events.filter(event => validaEvento(event, checkeds));
    cargarCards(cardChecked,conteinerCard)
  }
  else{cargarCards(dataCards.events,conteinerCard)}
}
}
