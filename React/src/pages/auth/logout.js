
import instance from '../../redux/axiosInstance';


export default function userlogout() {
    
    instance.get("user/logOut").then(()=> console.log("logout success"))
    window.sessionStorage.clear()
    
}
