
const url="https://mindhub-xj03.onrender.com/api/amazing"

async function getInfo(urlApi){
    try{
      const response= await fetch(urlApi)
       let data= await response.json()
       const containerTable1=document.getElementById("tb-event-stats")
       const containerTbUpcoming=document.getElementById("tb-upcomming")
       const containerTbPast=document.getElementById("tb-pastEvents")
      cargarTablaResumen(data.events,containerTable1)
      let upcommingEvents=data.events.filter(event=> new Date(event.date)> new Date(data.currentDate))
      cargarTablaEstadistica(upcommingEvents,containerTbUpcoming)
      let pastEvents=data.events.filter(event=> new Date(event.date)< new Date(data.currentDate))
      cargarTablaEstadistica(pastEvents,containerTbPast)
    }catch(error){
        console.log(error.message)
      }
    }

    getInfo(url)
      
    function revenues(arrayCard,categoria){
      let sumRevenues=0
      let arrayByCategory=arrayCard.filter(event=>event.category==categoria)
      arrayByCategory.forEach(event=> event.assistance==undefined? sumRevenues+=event.price * event.estimate:sumRevenues+=event.price * event.assistance)
      return Math.round(sumRevenues/arrayByCategory.length)      
      
    }

    function percentAttendance(arrayCard,categoria){
      let sumPercentage=0
      let arrayByCategory=arrayCard.filter(event=>event.category==categoria)
      arrayByCategory.forEach(event=> event.assistance==undefined? sumPercentage+=event.estimate/event.capacity:sumPercentage+=event.assistance/event.capacity)

      return Math.round(sumPercentage*100/arrayByCategory.length)
    }
    
    function cargarTablaResumen(arrayCards,contenedor){
        contenedor.innerHTML=""
        let eventMoreAssistance=arrayCards.filter(event=>event.assistance).reduce((a,b)=>{
          if(a.assistance/a.capacity> b.assistance/b.capacity) return a
          return b
      })
      let eventLessAssistance= arrayCards.filter(event=>event.assistance).reduce((a,b)=>{
        if(a.assistance/a.capacity > b.assistance/b.capacity) return b
        return a
    })
        let eventMoreCapacity= arrayCards.reduce((a,b)=>{
          if(a.capacity > b.capacity) return a
          return b
      })
        let fragment=document.createDocumentFragment()
        let trTable1=document.createElement("tr")
        trTable1.innerHTML=`<td class="text-center">${eventMoreAssistance.name} : ${eventMoreAssistance.assistance/eventMoreAssistance.capacity*100} %</td>
        <td class="text-center">${eventLessAssistance.name} : ${eventLessAssistance.assistance/eventLessAssistance.capacity*100} %</td>
        <td class="text-center">${eventMoreCapacity.name} : ${eventMoreCapacity.capacity}</td>`
        fragment.appendChild(trTable1)
        contenedor.appendChild(fragment)
    }

function cargarTablaEstadistica(arrayCards,contenedor){
  contenedor.innerHTM=""

  let fragment=document.createDocumentFragment()
  
  let categorys=[... new Set(arrayCards.map(event=>event.category))].sort()

  for(cat of categorys){
    let row=document.createElement("tr")
    row.classList.add("text-center")
    row.innerHTML=`<td class="text-center col-4">${cat}</td>
    <td class="text-center col-4">$ ${revenues(arrayCards,cat)}</td>
    <td class="text-center col-4">${percentAttendance(arrayCards,cat)}%</td>`

fragment.appendChild(row)
  }
  contenedor.appendChild(fragment)
}