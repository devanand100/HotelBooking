import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
  });


  
instance.interceptors.request.use(function (request) {
   
    document.body.classList.add('loader')
    
    return request;
}, function (error) {
    

    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    const err = error.response.data;

    

    if(err){
        const customError = new Error(err.message);
            customError.statusCode = err.statusCode
            throw customError;
    }
    
    return Promise.reject( error);
});

  export default instance;