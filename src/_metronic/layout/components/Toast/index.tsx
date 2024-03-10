import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

type ToastIcon = "success" | "error" | "warning" | "info" | "question";

type Toast = (icon: ToastIcon, title: string, text: string) => void;

const ToastFire: Toast = (icon, title, text) => {
  Toast.fire({
    icon: icon,
    title: title,
    text: text,
    position: "bottom-start",
    background: "rgb(16 79 153 / 90%)",
  });
};

export default ToastFire;
