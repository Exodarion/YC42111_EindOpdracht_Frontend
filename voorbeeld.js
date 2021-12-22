function show(url){
    // GET Request.
    fetch(url)
        // Handle success
        .then(response => response.json())  // convert to json
        .then(json => console.log(json))    //print data to console
        .catch(err => console.log('Request Failed', err)); // Catch errors
    }
    
    
    // data object maken opbasis van invoer velden
    
    function addObject(url2, data){
        // let data = {
        //     name: "Kees",
        //     age: "32"
        // }
    
        fetch(url2, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    
        .then(response => response.json) 
        .then(json => console.log(json))
        .catch(err => console.log(err));
    }
    
    
    // in the url we need to type id of deletion
    function deleteObject(url3, id){
    
        fetch(url3, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    
        .then(response => response.json())
        .then(json => console.log(json)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
    }
    
    function updateObject(url4, objectData){
    
        fetch(url4, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(objectData)
        })
    
        .then(response => response.json())
        .then(json => console.log(json)) // Manipulate the data retrieved back, if we want to do something with it
        .catch(err => console.log(err)) // Do something with the error
    }
 