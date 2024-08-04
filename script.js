function actualizarTemporada() {
    const anioActual = new Date().getFullYear();
    const anioSiguiente = anioActual + 1;
    const textoTemporada = `TEMPORADA ${anioActual} - ${anioSiguiente}`;
    document.getElementById('temporada').textContent = textoTemporada;
}

const tarifas = [
    { mes: "DICIEMBRE", primeraQuincena: "-", segundaQuincena: "-", semana: "-", porDia: "-" },
    { mes: "ENERO", primeraQuincena: "1200 US$", segundaQuincena: "1200 US$", semana: "-", porDia: "80 US$" },
    { mes: "FEBRERO", primeraQuincena: "1050 US$", segundaQuincena: "1050 US$", semana: "-", porDia: "70 US$" },
    { mes: "MARZO", primeraQuincena: "-", segundaQuincena: "-", semana: "-", porDia: "-" },
    { mes: "SEMANA SANTA", primeraQuincena: "-", segundaQuincena: "-", semana: "-", porDia: "-" }
];

function cargarTabla() {
    const tbody = document.getElementById("tarifas-body");
    if (!tbody) return; 

    tbody.innerHTML = `
        <tr>
            <th>Mes</th>
            <th>1° Quincena</th>
            <th>2° Quincena</th>
            <th>Semana</th>
            <th>Por día</th>
        </tr>
    `;
    tarifas.forEach(tarifa => {
        const row = document.createElement("tr");
        const cells = [
            tarifa.mes,
            tarifa.primeraQuincena,
            tarifa.segundaQuincena,
            tarifa.semana,
            tarifa.porDia
        ].map(content => {
            const cell = document.createElement("td");
            cell.textContent = content;
            if (content === "ALQUILADO") {
                cell.classList.add("alquilado");
            }
            return cell;
        });
        cells.forEach(cell => row.appendChild(cell));
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarTemporada();
    cargarTabla();
});