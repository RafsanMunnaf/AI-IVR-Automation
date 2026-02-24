"use client";
import Swal from "sweetalert2";

const Toaster = ({
  type,
  message,
  backgroundColor = "#0A48CD",
  timer = 3000,
}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    background: backgroundColor,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    color: "#FFFFFF",
    icon: type,
    title: message,
  });
};
export default Toaster;
