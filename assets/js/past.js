let conteinerCard=document.getElementById("cardPast")
const url="https://mindhub-xj03.onrender.com/api/amazing"

async function getInfo(urlApi,container){
try{
  const response= await fetch(urlApi)
   let data= await response.json()
console.log(data)
//GENERAMOS LAS CARD FILTRANDO POR FECHA
let pastCard = data.events.filter(event => new Date(data.currentDate)> new Date(event.date))
console.log(pastCard.length)
cargarCards(pastCard,container)
//GENERAMOS LOS CHECK 
let containerCheck = document.getElementById("pastCheck")
let categorysFilter = [... new Set(pastCard.map(event=>event.category))]
console.log(categorysFilter)
cargarCheck(categorysFilter, containerCheck);

//filtramos las categorys y Search
let searched = ""
let cardChecked = []
  
const search = document.getElementById("search");

search.addEventListener("keyup", findName)


function findName(e) {
  searched = e.target.value
  crossFilter(pastCard,cardChecked,searched)
}

let checkbox = document.querySelectorAll("input[type=checkbox]")



checkbox.forEach(categoria => { categoria.addEventListener('change', filterChecked) })

function filterChecked() {
  cardChecked = Array.from(checkbox).filter(check => check.checked).map(check => check.value)
  crossFilter(pastCard,cardChecked,searched)

}
}catch(error){
  console.log(error.message)
}
}

getInfo(url,conteinerCard)


//GENERAMOS LAS CARD FILTRANDO POR FECHA

function cargarCards(pastCard,contenedor){
  conteinerCard.innerHTML=""
  if(pastCard.length>0){
  let fragment=document.createDocumentFragment()
  for(card of pastCard){
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
    fragment.appendChild(cardDiv)
  
  }
  contenedor.appendChild(fragment)
}else{
  let div=document.createElement("div")
       div.innerHTML='<p class="bg-black px-2 text-danger display-5">The title entered does not exist</p>'
       contenedor.appendChild(div)
}
  }

  //GENERAMOS LOS CHECK

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

  function crossFilter(arrayCards,checked,searcheds) {
    let cardCheck = filterCard(checked, arrayCards)
    let cardSearched = filterSearch(searcheds, cardCheck)
    cargarCards(cardSearched, conteinerCard)
  
  }
  function filterCard(checkeado,listCard){
    return checkeado.length>0?listCard.filter(event=>checkeado.includes(event.category.replace(" ","_"))):listCard
 }
 function filterSearch(searchWord,listCard){
  return searchWord==""?listCard: listCard.filter(event=>event.name.toLowerCase().search(searchWord.toLowerCase().trim())!=-1)
  
}