const queryString=location.search

const params= new URLSearchParams(queryString)
const id=params.get("id")


const card=dataCards.events.find(event=>event._id==id)

cargarCard(card)

function cargarCard(card){
    
    const conteinerCard=document.getElementById("conteinerCard")
   
    let cardDiv=document.createElement("div")
    cardDiv.classList.add("row", "g-0")
  
    cardDiv.innerHTML=` <div class="d-flex col-md-6 align-items-center justify-content-center">
      <img src=${card.image} class="img-fluid h-100 w-100 border-end border-bottom"
        alt=${card.name.split(" ").join("_")}>
    </div>
    <div class="col-md-6 bg-black">
      <div class="card-body">
        <h5 class="card-title text-white">${card.name}</h5>
       
        
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-black text-white">Date: ${card.date}</li>
          <li class="list-group-item bg-black text-white">Description: ${card.description}</li>
          <li class="list-group-item bg-black text-white">Category: ${card.category}</li>
          <li class="list-group-item bg-black text-white">Place: ${card.place}</li>
          <li class="list-group-item bg-black text-white">Capacity: ${card.capacity}</li>
          <li class="list-group-item bg-black text-white">${Object.keys(card)[8].charAt(0).toUpperCase().concat(Object.keys(card)[8].slice(1))} : ${Object.values(card)[8]}</li>
          <li class="list-group-item bg-black text-white">Price: $ ${card.price}</li>
        </ul>
      </div>
    </div>`
  
  
  conteinerCard.appendChild(cardDiv)
  }