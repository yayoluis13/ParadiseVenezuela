const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	RUT: /^.{8}$/, // numeros,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	Clave: /^.{6}$/, // 6 digitos.
	
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	TarjetaNum: /^.{16}$/, // 16 digitos.
	TarjetaPin: /^.{4}$/, // 4 digitos.
}

const campos = {
	RUT: false,
	nombre: false,
	Clave: false,
	
	telefono: false,
	TarjetaNum: false,
	TarjetaPin: false, 
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "RUT":
			validarCampo(expresiones.RUT, e.target, 'RUT');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "Clave":
			validarCampo(expresiones.Clave, e.target, 'Clave');
			
		break;

		case "TarjetaNum":
			validarCampo(expresiones.TarjetaNum, e.target, 'TarjetaNum');
		break;
		
		case "TarjetaPin":
			validarCampo(expresiones.TarjetaPin, e.target, 'TarjetaPin');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.RUT && campos.nombre && campos.Clave && campos.telefono && campos.TarjetaNum && campos.TarjetaPin && terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});