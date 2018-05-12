mostrarTablaProductos();
mostrarCasas();

let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatosRegistro);

let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizacion);
botonActualizar.classList.add('ocultar');

let inputCod = document.querySelector('#txtCod');
let inputNombre = document.querySelector('#txtNombre');
let inputsTipo = document.querySelectorAll('input[type=radio]');
let inputCosto = document.querySelector('#txtCosto');
let slctCasa = document.querySelector('#sltCasas');

let inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', mostrarTablaProductos);

function obtenerDatosRegistro() {
    let bError = validarFormulario();

    if (bError == false) {
        let aInfoProducto = [];
        let sCod = inputCod.value;
        let sNombre = inputNombre.value;

        let sTipo = '';
        for (let i = 0; i < inputsTipo.length; i++) {
            if (inputsTipo[i].checked == true) {
                sTipo = JSON.parse(inputsTipo[i].value); // convierte el texto a boolean
            }
        }
        let nCosto = Number(inputCosto.value);
        let slctCasa = slctCasa.value;

        aInfoProducto.push(sCod, sNombre, sTipo, nCosto, slctCasa);
        registrarMedicamento(aInfoProducto);

        swal(
            '¡Felicidades!',
            'Medicamento registrado con éxito',
            'success'
        );

        mostrarTablaProductos();
        limpiarFormulario();
    } else {
        swal(
            '¡Tenga en cuenta!',
            'Existen campos requeridos en blanco',
            'warning'
        );
    }

}

function obtenerDatosActualizacion() {
    botonActualizar.classList.add('ocultar');
    botonRegistrar.classList.remove('ocultar');
    inputCod.disabled = false;

    let aInfoProducto = [];
    let sCod = inputCod.value;
    let sNombre = inputNombre.value;

    let sTipo = '';
    for (let i = 0; i < inputsTipo.length; i++) {
        if (inputsTipo[i].checked == true) {
            sTipo = JSON.parse(inputsTipo[i].value); // convierte el texto a boolean
        }
    }
    let nCosto = Number(inputCosto.value);
    let sltCasa = slctCasa.value;

    aInfoProducto.push(sCod, sNombre, sTipo, nCosto, sltCasa);
    actualizarProducto(aInfoProducto);
    swal(
        '¡Felicidades!',
        'Medicamento modificado con éxito',
        'success'
    );

    mostrarTablaProductos();
    limpiarFormulario();
}

function mostrarTablaProductos() {
    let mListaProductos = [];
    let sFiltro = document.querySelector('#txtFiltro').value;

    if (sFiltro == '') {
        mListaProductos = obtenerListaProductos();
    } else {
        mListaProductos = obtenerListaProductosFiltrado(sFiltro);
    }


    let tbody = document.querySelector('#tblMedicamentos tbody');
    let nTamanno = mListaProductos.length; //cantidad de filas, o medicamentos registradas

    tbody.innerHTML = '';

    for (let i = 0; i < nTamanno; i++) {
        let fila = tbody.insertRow(i);

        let colOpciones = fila.insertCell();

        let btnEditar = document.createElement('a'); // se crea el botón de editar
        btnEditar.classList.add('fas'); // se le asigna la clase fas
        btnEditar.classList.add('fa-edit'); // se le asigna la clase específica del ícono
        btnEditar.dataset.cod = mListaProductos[i][0];

        btnEditar.addEventListener('click', editarProducto);
        colOpciones.appendChild(btnEditar);// agregar el botón de editar  como hijo de la columna de opciones


        let btnBorrar = document.createElement('a'); // se crea el boton de eliminar
        btnBorrar.classList.add('fas'); // se le asigna la clase fa
        btnBorrar.classList.add('fa-trash'); // se le asigna la clase especifica del icono
        btnBorrar.dataset.cod = mListaProductos[i][0];
        
        btnBorrar.addEventListener('click', eliminarProducto);
        colOpciones.appendChild(btnBorrar);

        let colCod = fila.insertCell();
        colCod.innerHTML = mListaProductos[i][0];

        let colNombre = fila.insertCell();
        colNombre.innerHTML = mListaProductos[i][1];

        let colTipo = fila.insertCell();
        let sTipo = '';
        if (mListaProductos[i][2] == true) {
            sTipo = 'Oral';
        } else {
            sTipo = 'Intravenoso';
        }
        colTipo.innerHTML = sTipo;

        let colCosto = fila.insertCell();
        colCosto.innerHTML = mListaProductos[i][3];

        let colCasa = fila.insertCell();
        colCasa.innerHTML = mListaProductos[i][4];
    }

}

function mostrarCasas() {
    let mlistaCasas = obtenerListaCasas();
    let selectCasas = document.querySelector('#sltCasas');

    for (let i = 0; i < mlistaCasas.length; i++) {
        let opcion = document.createElement('option'); //crea el elemento option
        opcion.value = mlistaCasas[i][1]; //Agregar el value que se puede obtener al seleccionar una opcion
        opcion.text = mlistaCasas[i][1]; // el texto que se va a mostrar para cada opcion

        selectCasas.appendChild(opcion);
    }
}

function editarProducto() {
    let sCod = this.dataset.cod;

    botonActualizar.classList.remove('ocultar');
    botonRegistrar.classList.add('ocultar');

    let aMedicamentoSeleccionado = obtenerMedicamentoPorCod(sCod);


    inputCod.value = aMedicamentoSeleccionado[0];
    inputCod.disabled = true;

    inputNombre.value = aMedicamentoSeleccionado[1];

    if (aMedicamentoSeleccionado[2] == true) {
        inputsTipo[0].checked = true;
    } else {
        inputsTipo[1].checked = true;
    }
    inputCosto.value = aMedicamentoSeleccionado[3];
    slctCasa.value = aMedicamentoSeleccionado[4];

}

function eliminarProducto() {
    let scod = this.dataset.cod;
    
    if (!scod) {
        swal(
            '¡Codigo no existe!',
            'El medicamento que has seleccionado no existe',
            'warning'
        );
    } else {
        scod.remove;
        swal(
            '¡Felicidades!',
            'Medicamento eliminado con éxito',
            'success'
        );
    }
}

function validarFormulario() {
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

function limpiarFormulario() {
    inputCod.value = '';
    inputNombre.value = '';
    inputCosto.value = '';

    for (let i = 0; i < inputsTipo.length; i++) {
        inputsTipo[i].checked = false;
    }
}