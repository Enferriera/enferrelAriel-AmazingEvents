//GENERAMOS LAS CARD FILTRANDO POR FECHA
let fechaActual = new Date(dataCards.currentDate)
let conteinerCard = document.getElementById("cardUpcoming")
let upcomingCard = dataCards.events.filter(event => comparaFecha(fechaActual, event))
function comparaFecha(fechaActual, fechaEvento) {
  let fechaEvent = new Date(fechaEvento.date)
  return fechaEvent > fechaActual
}



cargarCards(upcomingCard,conteinerCard)


function cargarCards(upcomingCard,contenedor) {
  conteinerCard.innerHTML = ""
  let fragmento = document.createDocumentFragment()
  for (card of upcomingCard) {
    let cardDiv = document.createElement("div")
    cardDiv.classList.add("card", "mb-3")
    cardDiv.style.width = "25rem"
    cardDiv.innerHTML = `<img src=${card.image} class="card-img-top h-50 border-bottom" alt=${card.name.split(" ").join("_")}>
    <div class="card-body d-flex flex-column bg-black">
      <h5 class="card-title text-white">${card.name}</h5>
     <p class="text-white">${card.description}</p>
     <p class="text-white">$${card.price}</p>
      <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">Ver más</a>
    </div>`
    fragmento.appendChild(cardDiv)

  }
  contenedor.appendChild(fragmento)
}

//GENERAMOS LOS CHECK 
let containerCheck = document.getElementById("upcomingCheck")
let fragmentCheck = document.createDocumentFragment()
let categorysFilter = upcomingCard.map(event => event.category);
categorysFilter = categorysFilter.filter((valor, indice) => {
  return categorysFilter.indexOf(valor) === indice;
});
 cargarCheck(categorysFilter,containerCheck);


function cargarCheck(categorys, contenedor) {
  let fragmento=document.createDocumentFragment()
  for (check of categorys) {
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
    checkDiv.innerHTML = `<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  contenedor.appendChild(fragmento)
}

//hacemos filtrado con check
let checkbox = document.querySelectorAll("input[type=checkbox]")
let checkeds = []
checkbox.forEach(categoria => 
  categoria.addEventListener('change',filtrarCheck))
  
  function filtrarCheck(e) {
    if (this.checked) {
      checkeds.push(e.target.value)

      //console.log(checkeds)

    } else {
      checkeds = checkeds.filter(event => event !== e.target.value)
      //console.log(checkeds)

    }
    
    if (checkeds.length > 0) {
      cargarCards(upcomingCard.filter(event => validaEvento(event, checkeds)),conteinerCard)
    } else {
      cargarCards(upcomingCard,conteinerCard)
    }
  }

  


function validaEvento(evento, arregloCategorias) {
  return arregloCategorias.find(categoria => categoria == evento.category.split(" ").join("_"));
}


//Search

let botonSearch = document.getElementById("buttonSearch");
let search = document.getElementById("search");

search.addEventListener("keyup", buscarTitulo)

function buscarTitulo(e) {
  
  
if(e.target.value!="") {
  if (checkeds.length > 0) {
    let cardChecked = upcomingCard.filter(event => validaEvento(event, checkeds));
    let tituloCard = cardChecked.filter(event => event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
    if (tituloCard.length == 0) {
      conteinerCard.innerHTML=""
      let div=document.createElement("div")
       div.innerHTML='<p class="bg-black px-2 text-danger display-5">El titulo ingresado no existe</p>'
       conteinerCard.appendChild(div)
      //alert("El titulo ingresado no existe")
      //cargarCards(cardChecked,conteinerCard)
    }
    else {
        cargarCards(tituloCard,conteinerCard)
    }
  } else {
    let tituloCard = upcomingCard.filter(event=> event.name.toLowerCase().search(search.value.toLowerCase().trim())!=-1)
    
    //let tituloCard = upcomingCard.find(event => event.name.toLowerCase() == search.value.toLowerCase())
    if (tituloCard.length == 0) {
      conteinerCard.innerHTML=""
      let div=document.createElement("div")
       div.innerHTML='<p class="bg-black px-2 text-danger display-5">El titulo ingresado no existe</p>'
       conteinerCard.appendChild(div)
      /*alert("El titulo ingresado no existe")
      cargarCards(upcomingCard,conteinerCard)*/
    }
    else {
    cargarCards(tituloCard,conteinerCard)
    }
  }}else{
    if(checkeds.length > 0){

      let cardChecked = upcomingCard.filter(event => validaEvento(event, checkeds));
      cargarCards(cardChecked,conteinerCard)
    }
    else{cargarCards(upcomingCard,conteinerCard)}
  }
}

