// console.log('Client side javascript is loaded')

// fetch is a browser based api but its not accesssible in node js


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?latitude=26.4499&longitude=80.3319').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherform=document.querySelector('form')
const search1=document.querySelector('#lat')
const search2=document.querySelector('#lon')
const messageOne=document.querySelector('#message-1')

// messageOne.textContent=" from javascript"

const messageTwo=document.querySelector('#message-2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location1 =search1.value
    const location2 =search2.value

    messageOne.textContent="Loading...."
    messageTwo.textContent=""

    // fetch('http://localhost:3000/weather?latitude=26.4499&longitude=80.3319').then((response)=>{
    fetch('http://localhost:3000/weather?latitude='+location1+'&longitude='+location2).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
            console.log('http://localhost:3000/weather?latitude='+location1+'&longitude='+location2)
        }
    })
})

})
