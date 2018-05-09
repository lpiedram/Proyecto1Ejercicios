mostrarTablaInventario()

let inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', mostrarTablaInventario);


function mostrarTablaInventario() {
    let mListaInventario = [];
    let sFiltro = document.querySelector('#txtFiltro').value;

    if (sFiltro == '') {
        mListaInventario = obtenerListaInventario();
    } else {
        mListaInventario = obtenerListaInventarioFiltrada(sFiltro);
    }

    let tbody = document.querySelector('#tblInventarioC tbody');
    let nTamanno = mListaInventario.length; //cantidad de filas

    tbody.innerHTML = '';

    for (let i = 0; i < nTamanno; i++) {
        let fila = tbody.insertRow(i);

        let colCod = fila.insertCell();
        colCod.innerHTML = mListaInventario[i][0];

        let colNombre = fila.insertCell();
        colNombre.innerHTML = mListaInventario[i][1];

        let colPais = fila.insertCell();
        colPais.innerHTML = mListaInventario[i][2];
    }
}
