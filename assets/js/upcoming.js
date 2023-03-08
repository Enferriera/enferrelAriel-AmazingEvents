//GENERAMOS LAS CARD FILTRANDO POR FECHA
let fechaActual = new Date(dataCards.currentDate)
let conteinerCard = document.getElementById("cardUpcoming")
let upcomingCard = dataCards.events.filter(event => comparaFecha(fechaActual, event))
function comparaFecha(fechaActual, fechaEvento) {
  let fechaEvent = new Date(fechaEvento.date)
  return fechaEvent > fechaActual
}



cargarCards(upcomingCard, conteinerCard)


function cargarCards(upcomingCard, contenedor) {

  conteinerCard.innerHTML = ""
  if (upcomingCard.length > 0) {
    let fragmento = document.createDocumentFragment()
    for (card of upcomingCard) {
      let cardDiv = document.createElement("div")
      cardDiv.classList.add("card", "mb-3")
      cardDiv.style.width = "25rem"
      cardDiv.innerHTML = `<img src=${card.image} class="card-img-top h-50 border-bottom" alt=${card.name.split(" ").join("_")}>
    <div class="card-body d-flex flex-column bg-black">
      <h5 class="card-title text-white">${card.name}</h5>
     <p class="text-white">${card.description}</p>
     <p class="text-white">$ ${card.price}</p>
      <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">Ver más</a>
    </div>`
      fragmento.appendChild(cardDiv)

    }
    contenedor.appendChild(fragmento)
  } else {
    let div = document.createElement("div")
    div.innerHTML = '<p class="bg-black px-2 text-danger display-5">The title entered does not exist</p>'
    contenedor.appendChild(div)
  }
}

//GENERAMOS LOS CHECK 
let containerCheck = document.getElementById("upcomingCheck")
let fragmentCheck = document.createDocumentFragment()
let categorysFilter = [... new Set(upcomingCard)].map(event=>event.category);
cargarCheck(categorysFilter, containerCheck);


function cargarCheck(categorys, contenedor) {
  let fragmento = document.createDocumentFragment()
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


//Search

let searched = ""
let cardChecked = []
function filterCard(checkeado, listCard) {
  return checkeado.length > 0 ? listCard.filter(event => checkeado.includes(event.category.replace(" ", "_"))) : listCard
}
function filterSearch(searchWord, listCard) {
  return searchWord == "" ? listCard : listCard.filter(event => event.name.toLowerCase().search(searchWord.toLowerCase().trim()) != -1)
}

const search = document.getElementById("search");

search.addEventListener("keyup", findName)


function findName(e) {
  searched = e.target.value
  crossFilter(upcomingCard)
}





//filtramos las categorys
let checkbox = document.querySelectorAll("input[type=checkbox]")



checkbox.forEach(categoria => { categoria.addEventListener('change', filterChecked) })

function filterChecked() {
  cardChecked = Array.from(checkbox).filter(check => check.checked).map(check => check.value)
  crossFilter(upcomingCard)

}



function crossFilter(arrayCards) {
  let cardCheck = filterCard(cardChecked, arrayCards)
  let cardSearched = filterSearch(searched, cardCheck)
  cargarCards(cardSearched, conteinerCard)

}
