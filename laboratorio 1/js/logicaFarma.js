function obtenerListaProductos() {
    let mListaMedicamentos = JSON.parse(localStorage.getItem('mListaMedicamentosLS'));

    if (mListaMedicamentos == null) {
        mListaMedicamentos = [
            ['p01', 'Acetaminofen', 'Ultravenoso', 2900,'Glaxo Smith Kline'],
            ['p02', 'Alcohol', 'Oral', 12000,'Pfizer'],
            ['p03', 'Migradorixina', 'Oral', 1900,'Novartis'],
            ['p04', 'Tabcin', 'Oral', 2000,'Johnson & Johnson'],
            ['p05', 'Famotidina', 'Ultravenoso', 2800,'Astra Zeneca']
        ]
    }

    return mListaMedicamentos;

}
function obtenerListaCasas() {
    let mListaCasas = JSON.parse(localStorage.getItem('mListaCasasLS'));

    if (mListaCasas == null) {
        mListaCasas = [
            ['c01', 'Pfizer', 'USA'],
            ['c02', 'Glaxo Smith Kline','Inglaterra'],
            ['c03', 'Novartis', 'Suiza'],
            ['c04', 'Johnson & Johnson', 'USA'],
            ['c05', 'Astra Zeneca', 'Inglaterra']
        ]
    }

    return mListaCasas;

}

function buscarMedicamento(psCod) {
    let nIndice = -1;
    let mListaMedicamentos = obtenerListaProductos();
    let nTamanno = mListaMedicamentos.length;

    for (let i = 0; i < nTamanno; i++) {
        if (psCod == mListaMedicamentos[i][0]) {
            nIndice = i;
        }
    }
    return nIndice;
}

function buscarCasas(psCodC) {
    let nIndice = -1;
    let mListaCasas = obtenerListaCasas();
    let nTamanno = mListaCasas.length;

    for (let i = 0; i < nTamanno; i++) {
        if (psCodC == mListaCasas[i][0]) {
            nIndice = i;
        }
    }
    return nIndice;
}

function registrarMedicamento(paInfoMedicamento) {
    let mListaMedicamentos = obtenerListaProductos();
    let sCod = paInfoMedicamento[0];
    let nIndice = buscarMedicamento(sCod);

    if (nIndice == -1) {
        mListaMedicamentos.push(paInfoMedicamento);
        localStorage.setItem('mListaMedicamentosLS', JSON.stringify(mListaMedicamentos));
    }
}

function registrarCasa(paInfoCasa) {
    let mListaCasa = obtenerListaCasas();
    let sCodC = paInfoCasa[0];
    let nIndiceC = buscarCasas(sCodC);

    if (nIndiceC == -1) {
        mListaCasa.push(paInfoCasa);
        localStorage.setItem('mListaCasasLS', JSON.stringify(mListaCasa));
    }
}

function obtenerListaProductosFiltrado(psFiltro) {
    let mListaFiltrada = [];
    let mListaOriginal = obtenerListaProductos();

    psFiltro = psFiltro.toLowerCase();

    for (let i = 0; i < mListaOriginal.length; i++) {

        let sCod = mListaOriginal[i][0].toLowerCase();
        let sNombre = mListaOriginal[i][1].toLowerCase();
        let slcCasa = mListaOriginal[i][2];

        if (sCod.includes(psFiltro) || sNombre.includes(psFiltro) || slcCasa.includes(psFiltro)) {
            mListaFiltrada.push(mListaOriginal[i]);
        }
    }
    return mListaFiltrada;
}

function obtenerListaCasaFiltrado(psFiltroC) {
    let mListaFiltradaC = [];
    let mListaOriginal = obtenerListaCasas();

    psFiltroC = psFiltroC.toLowerCase();

    for (let i = 0; i < mListaOriginal.length; i++) {

        let sCodC = mListaOriginal[i][0].toLowerCase();
        let sNombreC = mListaOriginal[i][1].toLowerCase();
        let sPaisC = mListaOriginal[i][2].toLowerCase();
    }
    return mListaFiltradaC;
}

function obtenerMedicamentoPorCod(psCod) {
    let aInfoProducto = [];
    let mListaMedicamentos = obtenerListaProductos();
    let nTamanno = mListaMedicamentos.length;

    for (let i = 0; i < nTamanno; i++) {
        if (psCod == mListaMedicamentos[i][0]) {
            aInfoProducto = mListaMedicamentos[i];
        }
    }
    return aInfoProducto;
}

function obtenerCasaPorCod(psCodC) {
    let aInfoCasa = [];
    let mListaCasa = obtenerListaCasas();
    let nTamannoC = mListaCasa.length;

    for (let i = 0; i < nTamannoC; i++) {
        if (psCodC == mListaCasa[i][0]) {
            aInfoCasa = mListaCasa[i];
        }
    }
    return aInfoCasa;
}

function actualizarProducto(paInfoMedicamento) {
    let sCod = paInfoMedicamento[0];
    let nIndice = buscarMedicamento(sCod);
    let mListaMedicamentos = obtenerListaProductos();

    if (nIndice != -1) {
        mListaMedicamentos[nIndice] = paInfoMedicamento;
        localStorage.setItem('mListaMedicamentosLS', JSON.stringify(mListaMedicamentos));
    }

}

function actualizarCasa(paInfoCasa) {
    let sCodC = paInfoCasa[0];
    let nIndiceC = buscarCasas(sCodC);
    let mListaCasas = obtenerListaCasas();

    if (nIndiceC != -1) {
        mListaCasas[nIndiceC] = paInfoCasa;
        localStorage.setItem('mListaCasasLS', JSON.stringify(mListaCasas));
    }

}