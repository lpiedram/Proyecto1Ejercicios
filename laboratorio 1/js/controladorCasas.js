mostrarTablaCasas();

let inputCodC = document.querySelector('#txtCodC');
let inputNombreC = document.querySelector('#txtNombreC');
let inputPaisC = document.querySelector('#txtPaisC');

let inputFiltroC = document.querySelector('#txtFiltroC');
inputFiltroC.addEventListener('keyup', mostrarTablaCasas);

let botonRegistrarC = document.querySelector('#btnRegistrarC');
botonRegistrarC.addEventListener('click', obtenerDatosRegistroC);

let botonActualizarC = document.querySelector('#btnActualizarC');
botonActualizarC.addEventListener('click', obtenerDatosActualizacionC);
botonActualizarC.classList.add('ocultar');

function obtenerDatosRegistroC() {
    let bError = validarFormularioC();

    if (bError == false) {
        let aInfoCasa = [];
        let sCodC = inputCodC.value;
        let sNombreC = inputNombreC.value;
        let sPaisC = inputPaisC.value;

        aInfoCasa.push(sCodC, sNombreC, sPaisC);
        registrarCasa(aInfoCasa);

        swal(
            '¡Felicidades!',
            'Casa Farmaceutica registrada con éxito',
            'success'
        );

        mostrarTablaCasas();
        limpiarFormularioC();
    } else {
        swal(
            '¡Tenga en cuenta!',
            'Existen campos requeridos en blanco',
            'warning'
        );
    }

}

function obtenerDatosActualizacionC() {
    botonActualizarC.classList.add('ocultar');
    botonRegistrarC.classList.remove('ocultar');
    inputCodC.disabled = false;

    let aInfoCasa = [];
    let sCodC = inputCodC.value;
    let sNombreC = inputNombreC.value;
    let sPaisC = inputPaisC.value;

    aInfoCasa.push(sCodC, sNombreC, sPaisC);
    actualizarCasa(aInfoCasa);
    swal(
        '¡Felicidades!',
        'Medicamento modificado con éxito',
        'success'
    );

    mostrarTablaCasas();
    limpiarFormularioC();
}

function mostrarTablaCasas() {
    let mListaCasas = [];
    let sFiltroC = document.querySelector('#txtFiltroC').value;

    if (sFiltroC == '') {
        mListaCasas = obtenerListaCasas();
    } else {
        mListaCasas = obtenerListaCasasFiltrado(sFiltroC);
    }


    let tbodyC = document.querySelector('#tblCasaF tbody');
    let nTamannoC = mListaCasas.length; //cantidad de filas, o casas registradas

    tbodyC.innerHTML = '';

    for (let i = 0; i < nTamannoC; i++) {
        let filaC = tbodyC.insertRow(i);

        let colOpciones = filaC.insertCell();

        let btnEditar = document.createElement('a'); // se crea el botón de editar
        btnEditar.classList.add('fas'); // se le asigna la clase fa
        btnEditar.classList.add('fa-edit'); // se le asigna la clase específica del ícono
        btnEditar.dataset.codC = mListaCasas[i][0];

        btnEditar.addEventListener('click', editarCasa);
        colOpciones.appendChild(btnEditar); // agregar el botón de editar  como hijo de la columna de opciones


        let btnBorrar = document.createElement('a'); // se crea el boton de eliminar
        btnBorrar.classList.add('fas'); // se le asigna la clase fa
        btnBorrar.classList.add('fa-trash'); // se le asigna la clase especifica del icono

        // btnBorrar.addEventListener('click', eliminarCasa);
        colOpciones.appendChild(btnBorrar);

        let colCodC = filaC.insertCell();
        colCodC.innerHTML = mListaCasas[i][0];

        let colNombreC = filaC.insertCell();
        colNombreC.innerHTML = mListaCasas[i][1];

        let colPaisC = filaC.insertCell();
        colPaisC.innerHTML = mListaCasas[i][2];
    }

}

function editarCasa() {
    let sCodC = this.dataset.codC;

    botonActualizarC.classList.remove('ocultar');
    botonRegistrarC.classList.add('ocultar');

    let aCasaSeleccionado = obtenerCasaPorCod(sCodC);

    inputCodC.value = aCasaSeleccionado[0];
    inputCodC.disabled = true;

    inputNombreC.value = aCasaSeleccionado[1];
    inputPaisC.value = aCasaSeleccionado[2];

}

function validarFormularioC() {
    let bError = false;
    let inputsRequeridos = document.querySelectorAll('input:required');

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('inputError');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('inputError');
        }
    }
    return bError;
}

function limpiarFormularioC() {
    inputCodC.value = '';
    inputNombreC.value = '';
    inputPaisC.value = '';
}