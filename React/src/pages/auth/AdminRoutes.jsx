import { Navigate ,Outlet} from "react-router-dom"

export default function AdminRotes({islogged,isAdmin}) {
    console.log(!islogged ,!isAdmin)

    if(!islogged || !isAdmin){
        return <Navigate to={'/login'} />
    }
 
    return <Outlet />
}
