const request=require('request')
const forecast=(a,b, callback)=>{
    // const pnl='http://api.weatherstack.com/current?access_key=a59721e67fdb91766bdd68d32d3dbcc9&query='+coordinates
    //problem when we have special characters
    const pnl='http://api.weatherstack.com/current?access_key=a59721e67fdb91766bdd68d32d3dbcc9&query='+a+','+b+'&units=f'
    

    
    request({
        url:pnl, json:true},
        (error, {body})=>{ // after requesting it will runt the function
            // with two argument....error if we any error otherwise it will be undefine
            //restponse is whatever respong we will get from the request of the url
            // console.log(error)
    
            if(error){ // low level error, it means error exist but response doesnot
                callback('unable to connect to location services', undefined)
            }
            else if(body.error){
                callback('Unable to find location, Try another search', undefined)
                
            }
            else{
                // const data=JSON.parse(response.body)
                callback(undefined, body)
            }
        }
    )

}
module.exports=forecast