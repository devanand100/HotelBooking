import { Navigate ,Outlet} from "react-router-dom"

export default function UserRoutes({islogged}) {
  

    if(!islogged){
      return  <Navigate to={'/login'} />
    }
    return <Outlet/>
 
}
