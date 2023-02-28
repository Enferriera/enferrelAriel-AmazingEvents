//GENERAMOS LAS CARD 
let conteinerCard=document.getElementById("cardHome")
let fragmentCard=document.createDocumentFragment()
fragmentCard=cargarCards(fragmentCard)
conteinerCard.appendChild(fragmentCard)


function cargarCards(fragmento){
for(card of dataCards.events){
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

//GENERAMOS LAS CATEGORYS
let conteinerCheck=document.getElementById("containerCheck")
let fragmentCheck=document.createDocumentFragment()


let categorys=dataCards.events.map(event=>event.category)
let categorysFiltradas=categorys.filter((valor, indice) => {
  return categorys.indexOf(valor) === indice;
})
fragmentCheck=cargarCheck(fragmentCheck,categorysFiltradas)
conteinerCheck.appendChild(fragmentCheck)
console.log(categorysFiltradas)
function cargarCheck(fragmento, categorias){
  for(check of categorias){
    let checkDiv=document.createElement("div")
    checkDiv.classList.add("form-check", "form-check-inline")
       checkDiv.innerHTML=`<input class="form-check-input" type="checkbox" name="category" id=${check.split(" ").join("_")}
       value=${check.split(" ").join("_")}>
     <label class="form-check-label" for=${check.split(" ").join("_")}>${check}</label>`
    fragmento.appendChild(checkDiv)
  }
  return fragmento
  }
  

  