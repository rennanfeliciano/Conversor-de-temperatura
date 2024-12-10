const form = document.getElementById('form');


const escalaOrigem = document.getElementById('escalaOrigem');
const escalaDestino = document.getElementById('escalaDestino');

escalaOrigem.addEventListener('change', function () {
    atualizarOpcoesDestino();
});

function atualizarOpcoesDestino() {
    const selectedValue = escalaOrigem.value;

    Array.from(escalaDestino.options).forEach(option => {
        option.disabled = false;
    });

    const optionToDisable = Array.from(escalaDestino.options).find(option => option.value === selectedValue);
    if (optionToDisable) {
        optionToDisable.disabled = true;
    }

    if (escalaDestino.value === selectedValue) {
        escalaDestino.value = ''; 
    }
}

// Evento para enviar o formulário
form.addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const escalaOrigem = document.getElementById('escalaOrigem').value;
    const temperatura = document.getElementById('temperatura').value;
    const escalaDestino = document.getElementById('escalaDestino').value;

    if (!escalaOrigem || !escalaDestino || !temperatura) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const data = {
        option: escalaOrigem + escalaDestino,
        valor: parseFloat(temperatura),
    };

    try {
        const response = await fetch('http://192.168.15.21:8080/api/calculadora/converter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro ao conectar ao servidor.');
        }

        const result = await response.json();

        document.querySelector('.result p').innerText = `Resultado: ${result.resultado} ${escalaDestino}`;
    } catch (error) {
        document.querySelector('.result p').innerText = `Erro: ${error.message}`;
    }
});
