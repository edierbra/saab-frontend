import Swal from "sweetalert2"

const colorBlue = '#000066';
const colorRed = '#FF1616';
const colorGreen = '#008000'

export const SwalErrorAuthentication = (handlerLogout) => {
    Swal.fire({
        title: 'Error de autenticacion',
        text: "No tienes los permisos requeridos, Inicie sesion como usuario Admin o Root",
        icon: 'error',
        color: colorBlue,
        width: 400,
        iconColor: colorRed,
        showCancelButton: false,
        confirmButtonColor: colorBlue,
        cancelButtonColor: colorRed,
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {
            handlerLogout()
        }
    })
}

export const SwalContentDelete = (icon, text, title) => {
    return {
        title: `Quieres eliminar este ${title}?`,
        text: `El ${text} sera eliminado!`,
        icon: icon,
        color: colorBlue,
        width: 400,
        iconColor: colorRed,
        showCancelButton: true,
        confirmButtonColor: colorBlue,
        cancelButtonColor: colorRed,
        confirmButtonText: 'Aceptar'
    }
}

export const SwalToastDelete = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        iconColor: icon == "error" ? colorRed : colorGreen,
        title: `${title}`,
        position: 'bottom-end',
    })
}

export const SwalToastCreateOrEdit = (icon, title, id) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        iconColor: colorGreen,
        title: (id == 0 || id == '') ? `${title} Creado con exito` : `${title} Editado con exito`,
        position: 'bottom-end',
    })
}

export const SwalToastNotFound = (icon, title, id) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: true,
        confirmButtonColor: colorBlue,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        iconColor: colorRed,
        title: `${title}`,
        position: 'center',
    })
}

export const SwalToastErrorsFound = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: true,
        confirmButtonColor: colorBlue,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        iconColor: icon == "success" ? colorGreen : colorRed,
        title: `${title}`,
        position: 'center',
    })
}

export const SwalSelectedFile = (title, text, icon) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        color: colorBlue,
        width: 350,
        iconColor: colorRed,
        showCancelButton: false,
        confirmButtonColor: colorBlue,
        cancelButtonColor: colorRed,
        confirmButtonText: 'Aceptar'
    }).then((result) => {
        if (result.isConfirmed) {

        }
    })
}

// No Probados