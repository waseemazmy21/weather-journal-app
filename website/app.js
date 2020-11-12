/* Global Variables */

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '2a709527ce5daa8c2ca32ecb168d8403';
let button = document.getElementById('generate')
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// async get function 

const getData = async (baseURL,zip,apiKey)=>{
    const res = await fetch(baseURL + zip + '&units=metric&appid=' + apiKey)
  
    try{
  
      const data = await res.json();
      return data['main']['temp']
      
  
    }catch(error){
  
      console.log('error',error)
  
    }
}

const getProjectData = async (url = '')=>{
       const res = await fetch('/getProjectData')
  
    try{
  
      const data = await res.json();
      console.log(data);
      
  
    }catch(error){
  
      console.log('error',error)
  
    }
}
//async post function
const postData = async ( url = '', data = {})=>{
    console.log(data)
    const response = await fetch(url,{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

    try {
    const newData = await response.json();
    // console.log(newData);
    return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    } 
}
  

//update function
const updateUI = async () => {
    const request = await fetch('/getProjectData');
    try{
      const projectData = await request.json();
      document.getElementById('date').innerHTML = projectData[0].temperature;
      document.getElementById('temp').innerHTML = projectData[0].date;
      document.getElementById('content').innerHTML = projectData[0]['user response'];
  
    }catch(error){
      console.log("error", error);
    }
  }

button.addEventListener('click',action);

function action(){

    let zipCode = document.getElementById('zip').value;
    let userRes = document.getElementById('feelings').value;

    getData(baseURL,zipCode,apiKey)
    .then((data)=>{
        postData('/postData',{temperature: data,date: d,'user response': userRes})
    })
    .then(updateUI())

    
}
