import { Slide, toast } from "react-toastify";

let option = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
};

const getMessage = (msg,type)=>{
    switch (type) {
        case 'success':
            toast.success(msg,option)
            break;
        case 'error':
            toast.error(msg,option)
        default:
            break;
    }
}

const showMsg = {
    success:(msg)=>getMessage(msg,'success'),
    error:(msg)=>getMessage(msg,'error')
}
export default showMsg