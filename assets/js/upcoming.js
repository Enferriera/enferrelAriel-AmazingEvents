/*let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("cardUpcoming")
let fragment=document.createDocumentFragment()
fragment=cargarCardsUpcoming(fragment, fechaActual)
conteinerCard.appendChild(fragment)

function cargarCardsUpcoming(fragmento, fechaRef){
  for(card of dataCards.events){
      let fechaEvento= new Date(card.date)
  if(fechaRef<fechaEvento){
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
  }
  return fragmento
  }


*/

let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("cardUpcoming")
let upcomingCard=dataCards.events.filter(event=>comparaFecha(fechaActual,event))
function comparaFecha(fechaActual,fechaEvento){
  let fechaEvent= new Date(fechaEvento.date)
  return fechaEvent>fechaActual
}


let fragmentCard=document.createDocumentFragment()
fragmentCard=cargarCardsUpcoming(fragmentCard, upcomingCard)
conteinerCard.appendChild(fragmentCard)


function cargarCardsUpcoming(fragmento , upcomingCard){
  for(card of upcomingCard){
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
  return fragmento
  }

  //GENERAMOS LOS CHECK 
let containerCheck=document.getElementById("upcomingCheck")
let fragmentCheck=document.createDocumentFragment()


fragmentCheck=cargarCheck(fragmentCheck,upcomingCard)
containerCheck.appendChild(fragmentCheck)

function cargarCheck(fragmento, upcomingCards){
  for(check of upcomingCards){
    let checkDiv=document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" name="category" type="checkbox" id=${check.category.split(" ").join("_")}
       value=${check.category.split(" ").join("_")}>
     <label class="form-check-label" for=${check.category}>${check.category}</label>`
    fragmento.appendChild(checkDiv)
  }
  return fragmento
  }
  
