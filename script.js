let grafica = null;

const mortalidad = {
    18: { lx: 99192.296652814286, dx: 49.397763733102 },
    19: { lx: 99142.898889081189, dx: 50.265449736764 },
    20: { lx: 99092.633439344427, dx: 51.230891488141 },
    21: { lx: 99041.402547856283, dx: 52.293860545268 },
    22: { lx: 98989.108687311018, dx: 53.454118691148 },
    23: { lx: 98935.654568619866, dx: 54.711416976447 },
    24: { lx: 98880.943151643412, dx: 56.065494766982 },
    25: { lx: 98824.877656876430, dx: 57.516078796302 },
    26: { lx: 98767.361578080134, dx: 59.062882223692 },
    27: { lx: 98708.298695856443, dx: 60.804311996648 },
    28: { lx: 98647.494383859797, dx: 62.641158933751 },
    29: { lx: 98584.853224926046, dx: 64.671663715551 },
    30: { lx: 98520.181561210498, dx: 66.796683098501 },
    31: { lx: 98453.384878112003, dx: 69.212729569313 },
    32: { lx: 98384.172148542697, dx: 71.722061496288 },
    33: { lx: 98312.450087046411, dx: 74.422524715894 },
    34: { lx: 98238.027562330521, dx: 77.411565719116 },
    35: { lx: 98160.615996611406, dx: 80.589865733218 },
    36: { lx: 98080.026130878192, dx: 84.054582394163 },
    37: { lx: 97995.971548484027, dx: 87.804390507442 },
    38: { lx: 97908.167157976583, dx: 91.837860794182 },
    39: { lx: 97816.329297182398, dx: 96.153451699130 },
    40: { lx: 97720.175845483274, dx: 100.944941648384 },
    41: { lx: 97619.230903834890, dx: 106.112103992469 },
    42: { lx: 97513.118799842428, dx: 111.652521025820 },
    43: { lx: 97401.466278816602, dx: 117.660971264810 },
    44: { lx: 97283.805307551796, dx: 124.328703183051 },
    45: { lx: 97159.476604368741, dx: 131.456771845711 },
    46: { lx: 97028.019832523030, dx: 139.235208459671 },
    47: { lx: 96888.784624063366, dx: 147.755396551697 },
    48: { lx: 96741.029227511666, dx: 157.010690436251 },
    49: { lx: 96584.018537075419, dx: 167.090352069140 },
    50: { lx: 96416.928185006283, dx: 178.178483285892 },
    51: { lx: 96238.749701720386, dx: 190.264008160301 },
    52: { lx: 96048.485693560084, dx: 203.526741184654 },
    53: { lx: 95844.958952375426, dx: 217.951436657702 },
    54: { lx: 95627.007515717720, dx: 233.903660383446 },
    55: { lx: 95393.103855334281, dx: 251.360828658806 },
    56: { lx: 95141.743026675482, dx: 270.583117167865 },
    57: { lx: 94871.159909507624, dx: 291.633945561826 },
    58: { lx: 94579.525963945795, dx: 314.855241933976 },
    59: { lx: 94264.670722011826, dx: 340.483990647907 },
    60: { lx: 93924.186731363923, dx: 368.746357107335 },
    61: { lx: 93555.440374256592, dx: 399.949507599947 },
    62: { lx: 93155.490866656648, dx: 434.477209402087 },
    63: { lx: 92721.013657254560, dx: 472.506285597369 },
    64: { lx: 92248.507371657193, dx: 514.654422626475 },
    65: { lx: 91733.852949030712, dx: 561.319446195119 },
    66: { lx: 91172.533502835591, dx: 612.952942739564 },
    67: { lx: 90559.580560096030, dx: 670.140896144711 },
    68: { lx: 89889.439663951314, dx: 733.497827657843 },
    69: { lx: 89155.941836293467, dx: 803.740815654186 }
};

function actualizarAlfa() {
    const gastosAdmin = Number(document.getElementById("gastosAdmin").value) || 0;
    const gastosAdq = Number(document.getElementById("gastosAdq").value) || 0;
    const utilidades = Number(document.getElementById("utilidades").value) || 0;
    document.getElementById("alfa").value = gastosAdmin + gastosAdq + utilidades;
}

function calcularA(edad, plazo, interes) {
    if (plazo <= 0) return 0;

    const v = 1 / (1 + interes);
    const lxInicial = mortalidad[edad].lx;
    let suma = 0;

    for (let k = 0; k < plazo; k++) {
        suma += Math.pow(v, k + 1) * (mortalidad[edad + k].dx / lxInicial);
    }

    return suma;
}

function calcularAnualidad(edad, plazo, interes) {
    if (plazo <= 0) return 0;

    const v = 1 / (1 + interes);
    const lxInicial = mortalidad[edad].lx;
    let suma = 0;

    for (let k = 0; k < plazo; k++) {
        suma += Math.pow(v, k) * (mortalidad[edad + k].lx / lxInicial);
    }

    return suma;
}

function calcularSeguro() {
    actualizarAlfa();

    const edad = Number(document.getElementById("edad").value);
    const sumaAsegurada = Number(document.getElementById("suma").value);
    let interes = Number(document.getElementById("interes").value);
    let alfa = Number(document.getElementById("alfa").value);

    if (edad < 18 || edad > 65 || isNaN(edad)) {
        alert("Debes poner una edad dentro del rango de 18 a 65 años.");
        return;
    }

    interes = interes / 100;
    alfa = alfa / 100;

    const n = 5;

    const AInicial = calcularA(edad, n, interes);
    const aInicial = calcularAnualidad(edad, n, interes);

    const pnn = (sumaAsegurada * AInicial) / aInicial;
    const primaTarifa = pnn / (1 - alfa);

    document.getElementById("pnn").textContent = pnn.toFixed(2);
    document.getElementById("tarifa").textContent = primaTarifa.toFixed(2);
    document.getElementById("total").textContent = primaTarifa.toFixed(2);

    const edades = [];
    const t = [];
    const valoresA = [];
    const valoresa = [];
    const reserva = [];

    for (let i = 0; i <= n; i++) {
        const edadActual = edad + i;
        const plazoRestante = n - i;

        const ARestante = calcularA(edadActual, plazoRestante, interes);
        const aRestante = calcularAnualidad(edadActual, plazoRestante, interes);

        let reservaActual = (sumaAsegurada * ARestante) - (pnn * aRestante);

        if (Math.abs(reservaActual) < 0.01) {
            reservaActual = 0;
        }

        edades.push(edadActual);
        t.push(i);
        valoresA.push(ARestante);
        valoresa.push(aRestante);
        reserva.push(reservaActual);
    }

    let tabla = "";

    for (let i = 0; i < edades.length; i++) {
        tabla += `
        <tr>
            <td>${edades[i]}</td>
            <td>${t[i]}</td>
            <td>${valoresA[i].toFixed(8)}</td>
            <td>${valoresa[i].toFixed(6)}</td>
            <td>$${reserva[i].toFixed(2)}</td>
        </tr>
        `;
    }

    document.getElementById("tablaReserva").innerHTML = tabla;

    if (grafica) {
        grafica.destroy();
    }

    const ctx = document.getElementById("graficaReserva");

    grafica = new Chart(ctx, {
        type: "line",
        data: {
            labels: t,
            datasets: [{
                label: "Reserva Matemática",
                data: reserva,
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Año de la póliza (t)"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Reserva Matemática ($)"
                    }
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnCalcular").addEventListener("click", calcularSeguro);
    actualizarAlfa();
});
