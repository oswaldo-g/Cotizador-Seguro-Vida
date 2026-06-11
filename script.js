let grafica = null;

function actualizarAlfa() {
    const gastosAdmin = Number(document.getElementById("gastosAdmin").value) || 0;
    const gastosAdq = Number(document.getElementById("gastosAdq").value) || 0;
    const utilidades = Number(document.getElementById("utilidades").value) || 0;

    const alfa = gastosAdmin + gastosAdq + utilidades;

    document.getElementById("alfa").value = alfa;
}

function calcularSeguro() {
    actualizarAlfa();


    const edad = Number(document.getElementById("edad").value);

if (edad < 18 || edad > 65 || isNaN(edad)) {
    alert("Debes poner una edad dentro del rango de 18 a 65 años.");
    return;
}
    // Datos actuales de tu Excel
    const pnn = 48.19;
    const primaTarifa = 64.25;

    document.getElementById("pnn").textContent = pnn.toFixed(2);
    document.getElementById("tarifa").textContent = primaTarifa.toFixed(2);
    document.getElementById("total").textContent = primaTarifa.toFixed(2);

    // Datos de reserva obtenidos en Excel
    const edades = [18, 19, 20, 21, 22, 23];
    const t = [0, 1, 2, 3, 4, 5];

    const A = [
        0.00210519,
        0.00164059,
        0.00119954,
        0.00078018,
        0.00038083,
        0
    ];

    const a = [
        4.3686073,
        3.3686073,
        2.4361490,
        1.5666784,
        0.7559488,
        0
    ];

    const reserva = [
        0,
        1.73,
        2.56,
        2.52,
        1.65,
        0
    ];

    // Llenar tabla
    let tabla = "";

    for (let i = 0; i < edades.length; i++) {

        tabla += `
        <tr>
            <td>${edades[i]}</td>
            <td>${t[i]}</td>
            <td>${A[i].toFixed(8)}</td>
            <td>${a[i].toFixed(6)}</td>
            <td>$${reserva[i].toFixed(2)}</td>
        </tr>
        `;
    }

    document.getElementById("tablaReserva").innerHTML = tabla;

    // Destruir gráfica anterior
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