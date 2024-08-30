const chave = 'c74912fc6e706dac850860311f2d7d0f';
const cidade = document.querySelector('.input-cidade');
const botao = document.querySelector('.botao-busca');
const titulo = document.querySelector('.cidade');
const temperatura = document.querySelector('.temp');
const previsao = document.querySelector('.texto-previsao');
const bandeiraa = document.querySelector('.bandeira');

botao.addEventListener('click', buscarCidade);

async function buscarCidade() {
    let ncidade = cidade.value;

    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ncidade}&appid=${chave}&units=metric&lang=pt_br`)
            .then(resposta => resposta.json());

        // Obter o código do país
        const codigoPais = dados.sys.country.toLowerCase();

        // Construir a URL da bandeira
        const urlBandeira = `https://flagcdn.com/16x12/${codigoPais}.png`;

        // Atualizar o conteúdo da página
        titulo.textContent = "Tempo em " + dados.name;
        temperatura.textContent = Math.ceil(dados.main.temp) + "°C";
        previsao.textContent = dados.weather[0].description;
        bandeiraa.src = urlBandeira;
        bandeiraa.alt = `Bandeira de ${dados.sys.country}`;

        console.log(dados);
    } catch (error) {
        console.error('Erro ao buscar a cidade:', error);
    }
}
