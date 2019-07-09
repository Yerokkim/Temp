import {array} from './de.js';

let weather_key = '95fe06c6c36bbce695bf7195b763c721'
//let weatherUrl=`http://api.openweathermap.org/data/2.5/weather?q=${regions},de&APPID=${weather_key}`

let cityDB=array.cities
var cities=cityDB.map((x=>x.city));
console.log(cities)


async function getWeather(){

     let allWeather= await cities.map(city => 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},de&units=metric&APPID=${weather_key}`)
      .then(res => res.json())
       .then(json => {
            
            let weatherData=json
            return weatherData
           
      }).catch(err=>{
          console.log("The error is"+err)
          return err
         
      })
     
  )
  return Promise.all(allWeather)
      
  
  }

  getWeather().then(data=>{
    return data
}).catch(err=>{
    console.log(err)
    return err
})

//to get lowest temp

async function getLowest(){
    let weather=await getWeather()
    //console.log(weather[0].name)
    let temps=  weather.map((x=>x.main.temp))
    let lowest=  Math.min(...temps)


    var lowestCity = await weather.filter(function(t) {
        return t.main.temp === lowest;
      });
      document.querySelector("#city").innerHTML = lowestCity[0].name;
      document.querySelector("#temp").innerHTML = lowestCity[0].main.temp
      return lowestCity
    
}

getLowest().then(lower=>{
    return lower
}).catch(err=>{

    console.log("Erorr:"+err)
    return err


})

    async function initMap() {
        var location= await getLowest()
        let latlang= await location[0].coord
        let lat = latlang.lat
        let lon= latlang.lon

        console.log(lon)
        var options={
            zoom:8,
            center:{lat:lat,lng:lon}
        }

        var map = new google.maps.Map(
            document.getElementById('map'), options);
           
            var marker=new google.maps.Marker({
                position:{lat:lat,lng:lon},
                 map: map,
                icon:"https://img.icons8.com/plasticine/100/000000/pinguin.png"
            })
       
    
        }  

      initMap().then().catch(err=>{
          return err
      })
    
