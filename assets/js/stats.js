
const url="https://mindhub-xj03.onrender.com/api/amazing"
const containerTable1=document.getElementById("tr-event")
async function getInfo(urlApi,container=""){
    try{
      const response= await fetch(urlApi)
       let data= await response.json()
    let arrayAssistanc=sortByAssistanceDesc(data.events)
    cargarPrimerTabla(arrayAssistanc,containerTable1)
    }catch(error){
        console.log(error.message)
      }
    }

    getInfo(url)
      
    function sortByAssistanceDesc(arrayCards){
        return arrayCards.filter(event=>event.assistance).sort((a,b)=>{
        
            if ((a.assistance/a.capacity) > (b.assistance/b.capacity)) {
                return -1;
              }
              if ((a.assistance/a.capacity) < (b.assistance/b.capacity)) {
                return 1;
              }
              // a debe ser igual b
              return 0;
        })

    }

    function cargarPrimerTabla(arrayCards,contenedor){
        contenedor.innerHTML=""
        let dimensionArray=arrayCards.length
        console.log(dimensionArray)
        let fragment=document.createDocumentFragment()
        let tdMayorAssist=document.createElement("td")
        tdMayorAssist.innerHTML=`${arrayCards[0].name} : ${arrayCards[0].assistance/arrayCards[0].capacity*100} %`
        fragment.appendChild(tdMayorAssist)
        let tdMenorAssist=document.createElement("td")
        tdMenorAssist.innerHTML=`${arrayCards[arrayCards.length-1].name} : ${arrayCards[(dimensionArray-1)].assistance/arrayCards[(dimensionArray-1)].capacity*100} %`
        fragment.appendChild(tdMenorAssist)
        let tdMayorCapacity=document.createElement("td")
        let mayorCapacity=arrayCards.map(event=>event.capacity).sort(( a, b )=> a - b )[dimensionArray-1]
        console.log(mayorCapacity)
        tdMayorCapacity.innerHTML=`${arrayCards.find(event=>event.capacity==mayorCapacity).name}:${mayorCapacity}`
        fragment.appendChild(tdMayorCapacity)
        contenedor.appendChild(fragment)
    }