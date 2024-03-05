import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  
});
export default Toast;
