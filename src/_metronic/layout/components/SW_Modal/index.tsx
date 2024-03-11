import Swal, { SweetAlertResult } from "sweetalert2";

// Define a type for the icon of the toast notification
type ToastIcon = "success" | "error" | "warning" | "info" | "question";

// Define the type for the function that creates the toast notification
type SwalFire = (
  icon: ToastIcon, // Icon type for the toast notification
  title: string, // Title of the toast notification
  text: string, // Text content of the toast notification
  showDenyButton: boolean, // Whether to show the deny button
  showCancelButton: boolean, // Whether to show the cancel button
  denyButtonText: string // Text for the deny button
) => Promise<SweetAlertResult>; // Promise that resolves with SweetAlertResult

// Define the function that creates the toast notification
const SwalFire: SwalFire = (
  icon,
  title,
  text,
  showDenyButton,
  showCancelButton,
  denyButtonText
) => {
  // Return a Promise that resolves when the user interacts with the toast notification
  return Swal.fire({
    icon,
    title,
    text,
    showConfirmButton: false, // Do not show the confirm button
    showDenyButton, // Whether to show the deny button
    showCancelButton, // Whether to show the cancel button
    denyButtonText, // Text for the deny button
    cancelButtonText: "لغو", // Text for the cancel button
    background: "rgb(21 23 28 / 90%)", // Background color of the toast notification
    width: 400, // Width of the toast notification
  });
};

export default SwalFire; // Export the function for external use
