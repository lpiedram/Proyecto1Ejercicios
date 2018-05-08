function obtenerListaInventario() {
    let mListaInventario = JSON.parse(localStorage.getItem('mListaInventarioLS'));

    if (mListaInventario == null) {
        mListaInventario = [
            ['c01','Lacofa','Costa Rica'],
            ['c02', 'Aclames Laboratorios Quimicos de CA', 'Costa Rica'],
            ['c03', 'Glaxosmithkline Costa Rica S.A.', 'Costa Rica'],
            ['c04', 'Laboratorio Hahnemann Homeopáticos', 'Costa Rica '],
            ['c05', 'Zepol Centroamericana S.A.', 'Costa Rica'],
            ['c06', 'Labinsa (Laboratorios Internacionales)', 'Costa Rica'],
            ['c07', 'Novartis Pharma Logistics Inc.', 'Costa Rica']
        ]
    }
    return mListaInventario;
}

function buscarInventario(psCod) {
    let nIndice = -1;
    let mListaInventario = obtenerListaInventario();
    let nTamanno = mListaInventario.length;

    for (let i = 0; i < nTamanno; i++) {
        if (psCod == mListaInventario[i][0]) {
            nIndice = i;
        }
    }
    return nIndice;
}

function registrarInventario(paInfoInventario) {
    let mListaInventario = obtenerListaInventario();
    let psCod = paInfoInventario[0];
    let nIndice = buscarInventario(psCod);

    if (nIndice == -1) {
        mListaInventario.push(paInfoInventario);
        localStorage.setItem('mListaInventarioLS', JSON.stringify(mListaInventario));
    }
}

function obtenerInventarioPorCodigo(psCod) {
    let paInfoInventario = [];
    let mListaInventario = obtenerListaInventario();
    let nTamanno = mListaInventario.length;

    for (let i = 0; i < nTamanno; i++) {
        if (psCod == mListaInventario[i][0]) {
            paInfoInventario = mListaInventario[i];
        }
    }
    return paInfoInventario;
}

function obtenerListaInventarioFiltrada(psFiltro) {
    let mListaFiltrada = [];
    let mListaOriginal = obtenerListaInventario();

    psFiltro = psFiltro.toLowerCase();

    for (let i = 0; i < mListaOriginal.length; i++) {
        
        let sCod = mListaOriginal[i][0].toLowerCase();
        let sNombre = mListaOriginal[i][1].toLowerCase();
        let sPais = mListaOriginal[i][2].toLowerCase();

        if (sCod.includes(psFiltro) || sNombre.includes(psFiltro) || sPais.includes(psFiltro)) {
            mListaFiltrada.push(mListaOriginal[i]);
        }
    }
    return mListaFiltrada;
}

function actualizarInventario(paInfoInventario) {
    let sCod = paInfoInventario[0];
    let nIndice = buscarInventario(sCod);
    let mListaInventario = obtenerListaInventario();

    if (nIndice != -1) {
        mListaInventario[nIndice] = paInfoInventario;
        localStorage.setItem('mListaInventarioLS', JSON.stringify(mListaInventario));
    }
}