//GENERAMOS LAS CARD 
const conteinerCard=document.getElementById("cardHome")


cargarCards(dataCards.events,conteinerCard)


function cargarCards(events,contenedor){
  conteinerCard.innerHTML=""
  if(events.length>0){
  let fragmento=document.createDocumentFragment()
 
for(card of events){
  let cardDiv=document.createElement("div")
  cardDiv.classList.add("card", "mb-3")
  cardDiv.style.width="25rem"
  cardDiv.innerHTML=`<img src=${card.image} class="card-img-top h-50 border-bottom" alt=${card.name.split(" ").join("_")}>
  <div class="card-body d-flex flex-column bg-black">
    <h5 class="card-title text-white">${card.name}</h5>
   <p class="text-white">${card.description}</p>
   <p class="text-white">$ ${card.price}</p>
    <a href="./details.html?id=${card._id}" class="btn text-white  color-btn align-self-end">Ver más</a>
  </div>`
  fragmento.appendChild(cardDiv)
}
contenedor.appendChild(fragmento)
}else{
  let div=document.createElement("div")
       div.innerHTML='<p class="bg-black px-2 text-danger display-5">The title entered does not exist</p>'
       contenedor.appendChild(div)
}

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
  
  //Search

let searched=""
let cardCheckeadas=[]
function filtrarCard(checkeado,listCard){
  console.log("Imprime en funcion: longitud "+checkeado.length)
  return checkeado.length>0?listCard.filter(event=>checkeado.includes(event.category.replace(" ","_"))):listCard
 
 }
 function filterSearch(searchWord,listCard){
  return searchWord==""?listCard: listCard.filter(event=>event.name.toLowerCase().search(searchWord.toLowerCase().trim())!=-1)
  
}

const search=document.getElementById("search");

search.addEventListener("keyup",buscarTitulo)


function buscarTitulo(e){

  searched=e.target.value
  dobleFiltro(dataCards.events)
//console.log(searched)
}





  //filtramos las categorys
let checkbox=document.querySelectorAll("input[type=checkbox]")
 
 

checkbox.forEach(categoria=>{categoria.addEventListener('change',filtrarCardChecked)})

function filtrarCardChecked() {
  cardCheckeadas=Array.from(checkbox).filter(check=>check.checked).map(check=>check.value)
  console.log(cardCheckeadas)
dobleFiltro(dataCards.events)
 
} 



function dobleFiltro(arrayCards){
  let cardChecked=filtrarCard(cardCheckeadas,arrayCards)
  let cardSearched=filterSearch(searched,cardChecked)
  cargarCards(cardSearched,conteinerCard)
  
  }


