//GENERAMOS LAS CARD FILTRANDO POR FECHA
let fechaActual = new Date(dataCards.currentDate)
let conteinerCard = document.getElementById("cardUpcoming")
let upcomingCard = dataCards.events.filter(event => comparaFecha(fechaActual, event))
function comparaFecha(fechaActual, fechaEvento) {
  let fechaEvent = new Date(fechaEvento.date)
  return fechaEvent > fechaActual
}



conteinerCard.appendChild(cargarCards(upcomingCard))


function cargarCards(upcomingCard) {
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
      <a href="./details.html" class="btn text-white  color-btn align-self-end">Ver más</a>
    </div>`
    fragmento.appendChild(cardDiv)

  }
  return fragmento
}

//GENERAMOS LOS CHECK 
let containerCheck = document.getElementById("upcomingCheck")
let fragmentCheck = document.createDocumentFragment()
let categorysFilter = upcomingCard.map(event => event.category);
categorysFilter = categorysFilter.filter((valor, indice) => {
  return categorysFilter.indexOf(valor) === indice;
});
fragmentCheck = cargarCheck(fragmentCheck, categorysFilter);
containerCheck.appendChild(fragmentCheck);

function cargarCheck(fragmento, categorys) {
  for (check of categorys) {
    let checkDiv = document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
    checkDiv.innerHTML = `<input class="form-check-input" name="category" type="checkbox" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  return fragmento
}

//hacemos filtrado con check
let checkbox = document.querySelectorAll("input[type=checkbox]")
let checkeds = []
checkbox.forEach(categoria => {
  categoria.addEventListener('change', function () {
    if (this.checked) {
      checkeds.push(categoria.value)

      //console.log(checkeds)

    } else {
      checkeds = checkeds.filter(event => event !== categoria.value)
      //console.log(checkeds)

    }
    
    if (checkeds.length > 0) {
      conteinerCard.appendChild(cargarCards(upcomingCard.filter(event => validaEvento(event, checkeds))))
    } else {
      conteinerCard.appendChild(cargarCards(upcomingCard))
    }
  }

  )
  
});


function validaEvento(evento, arregloCategorias) {
  return arregloCategorias.find(categoria => categoria == evento.category.split(" ").join("_"));
}


//Search

let botonSearch = document.getElementById("buttonSearch");
let search = document.getElementById("search");

botonSearch.addEventListener("click", function (e) {
  e.preventDefault()
  
if(search.value!="") {
  if (checkeds.length > 0) {
    let cardChecked = upcomingCard.filter(event => validaEvento(event, checkeds));
   // let tituloCard = cardChecked.find(event => event.name.toLowerCase().idexOf(search.value.toLowerCase())!=-1)
   let tituloCard = cardChecked.find(event => event.name.toLowerCase().search(search.value.toLowerCase())!=-1)
    if (tituloCard == undefined) {
      /* let p=document.createElement("p")
       p.textContent="El titulo ingresado no existe"
       conteinerCard.appendChild(p)*/
      alert("El titulo ingresado no existe")
      conteinerCard.appendChild(cargarCards(cardChecked))
    }
    else {
        conteinerCard.appendChild(cargarCards(cardChecked.filter(event => event.name.toLowerCase()==tituloCard.name.toLowerCase())))
    }
  } else {
    let tituloCard = upcomingCard.find(event=> event.name.toLowerCase().search(search.value.toLowerCase())!=-1)
    
    //let tituloCard = upcomingCard.find(event => event.name.toLowerCase() == search.value.toLowerCase())
    if (tituloCard == undefined) {
      /* let p=document.createElement("p")
       p.textContent="El titulo ingresado no existe"
       conteinerCard.appendChild(p)*/
      alert("El titulo ingresado no existe")
      conteinerCard.appendChild(cargarCards(upcomingCard))
    }
    else {
    conteinerCard.appendChild(cargarCards(upcomingCard.filter(event => event.name.toLowerCase() == tituloCard.name.toLowerCase())))
    }
  }}else{
    alert("Debe ingresar algo para la busqueda")
  }
})

