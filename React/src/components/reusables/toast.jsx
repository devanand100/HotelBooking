import { toast } from 'react-toastify';


const notify = (msg ,type) => {

    console.log("toast called",msg)
   let pos = {position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"}
    
    switch (type) {
        case "success":
            toast.success(msg, pos);
            break;
        case "error":
            toast.error(msg, pos);
            break;
        case "info":
            toast.info(msg, pos);
            break;
        default:
            toast(msg, pos);
            break;
    }

}


export default notify