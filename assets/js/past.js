let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("cardPast")
let pastCard=dataCards.events.filter(event=>comparaFecha(fechaActual,event))
function comparaFecha(fechaActual,fechaEvento){
  let fechaEvent= new Date(fechaEvento.date)
  return fechaEvent<fechaActual
}
console.log(pastCard)

let fragmentCard=document.createDocumentFragment()
fragmentCard=cargarCardsPast(fragmentCard, pastCard)
conteinerCard.appendChild(fragmentCard)


function cargarCardsPast(fragmento , pastCard){
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
  return fragmento
  }

  let containerCheck=document.getElementById("pastCheck")
let fragmentCheck=document.createDocumentFragment()


fragmentCheck=cargarCheck(fragmentCheck,pastCard)
containerCheck.appendChild(fragmentCheck)

function cargarCheck(fragmento, pastCards){
  for(check of pastCards){
    let checkDiv=document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" name="category" type="checkbox" id=${check.category.split(" ").join("_")}
       value=${check.category.split(" ").join("_")}>
     <label class="form-check-label" for=${check.category}>${check.category}</label>`
    fragmento.appendChild(checkDiv)
  }
  return fragmento
  }
  
