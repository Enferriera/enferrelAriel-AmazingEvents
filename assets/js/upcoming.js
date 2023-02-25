let fechaActual= new Date(dataCards.currentDate)
let conteinerCard=document.getElementById("cardUpcoming")
let fragment=document.createDocumentFragment()
for(card of dataCards.events){
    let fechaEvento= new Date(card.date)
if(fechaActual<fechaEvento){
    let cardDiv=document.createElement("div")
  cardDiv.classList.add("card", "mb-3")
  cardDiv.style.width="25rem"
  cardDiv.innerHTML=`<img src=${card.image} class="card-img-top h-50 border-bottom" alt="...">
  <div class="card-body d-flex flex-column bg-black">
    <h5 class="card-title text-white">${card.name}</h5>
   <p class="text-white">${card.description}</p>
   <p class="text-white">$${card.price}</p>
    <a href="./details.html" class="btn text-white  color-btn align-self-end">Ver más</a>
  </div>`
  fragment.appendChild(cardDiv)
}
}

conteinerCard.appendChild(fragment)