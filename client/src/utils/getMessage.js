import { Slide, toast } from "react-toastify";

const options = toast.success("🦄 Wow so easy!", {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Slide,
});

const getMessage = (type,message)=>{
    switch (type) {
        case 'success':
            toast.success(message,options)
            break;
        case 'error':
            toast.error(message,options)
        default:
            break;
    }
}

const showMsg = {
    success:(msg)=>getMessage('success',msg),
    error:(msg)=>getMessage('error',msg)
}
export default showMsg