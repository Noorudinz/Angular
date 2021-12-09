declare var swal: any;

export function tosterAlert(message: string, type: string){
  const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000
  });
  Toast.fire({
    icon: type,
    title: message
  });
}

