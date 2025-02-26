#Target Sistemas Code Challenge
## Questão 1:
Observe o trecho de código abaixo: int INDICE = 13, SOMA = 0, K = 0; 
Enquanto K < INDICE faça { K = K + 1; SOMA = SOMA + K; }
Imprimir(SOMA);

Ao final do processamento, qual será o valor da variável SOMA?

![Captura de Tela 2025-02-26 às 15 23 44](https://github.com/user-attachments/assets/123b06f3-2d7a-4685-a01e-c2c418e3a4e8)

**Resposta:** Reproduzindo no navegador o código o final do processamento teremos 91.

## Questão 2:
Dado a sequência de Fibonacci, onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...), escreva um programa na linguagem que desejar onde, informado um número, ele calcule a sequência de Fibonacci e retorne uma mensagem avisando se o número informado pertence ou não a sequência. 

IMPORTANTE: Esse número pode ser informado através de qualquer entrada de sua preferência ou pode ser previamente definido no código;

**Resposta:** Foi usado o site [bosontreinamentos](https://www.bosontreinamentos.com.br/logica-de-programacao/algoritmo-para-verificar-se-um-numero-pertence-a-serie-de-fibonacci/) para pegar a fórmula de cálculo.
O código JavaScript foi criado abaixo para responder a questão implementando a fórmula.

```javascript
function isFibonacciNumber(number) {
  // Validações de entrada
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("O input deve ser um número válido");
  }

  if (number < 0) {
    throw new Error("A sequência de Fibonacci não inclui números negativos");
  }

  if (number === 0 || number === 1) {
    return true;
  }

  // Calculo de fibonacci retirado de https://www.bosontreinamentos.com.br/logica-de-programacao/algoritmo-para-verificar-se-um-numero-pertence-a-serie-de-fibonacci/
  return (
    isPerfectSquare(5 * number * number + 4) ||
    isPerfectSquare(5 * number * number - 4)
  );
}

function isPerfectSquare(number) {
  const sqrt = Math.sqrt(number);
  return Math.floor(sqrt) === sqrt;
}

function displayFibonacciCheckResult(number) {
  try {
    const result = isFibonacciNumber(number);
    console.log(
      `O número ${number} ${
        result ? "pertence" : "não pertence"
      } à sequência de Fibonacci.`
    );
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

// Testes
displayFibonacciCheckResult(0);
displayFibonacciCheckResult(1);
displayFibonacciCheckResult(5);
displayFibonacciCheckResult(7);
displayFibonacciCheckResult(13);
displayFibonacciCheckResult(21);
```

## Questão 3:
Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, faça um programa, na linguagem que desejar, que calcule e retorne: 
• O menor valor de faturamento ocorrido em um dia do mês; 
• O maior valor de faturamento ocorrido em um dia do mês; 
• Número de dias no mês em que o valor de faturamento diário foi superior à média mensal. 

IMPORTANTE: 

a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal; 

b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;

**Resposta: **Foi criado um arquivo JSON com dados fictícios de faturamento por dia.
No código feito o programa lê o arquivo JSON, analisa os dados de faturamento e exibe os valores requisitados.

```javascript
const fs = require("fs");

// Carrega o arquivo JSON
function loadJsonData(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Erro ao parsear os dados de entrada: ${error.message}`);
    return [];
  }
}

// Analisa os dados de faturamento
function analyzeRevenue(data) {
  // Filtra os dias com faturamento
  const daysWithRevenue = data.filter((day) => day.value > 0);

  // Se não houver dias com faturamento, retorna valores padrão
  if (daysWithRevenue.length === 0) {
    return {
      minRevenue: 0,
      maxRevenue: 0,
      daysAboveAverage: 0,
    };
  }

  // Encontra o faturamento mínimo
  const minRevenue = Math.min(...daysWithRevenue.map((day) => day.value));

  // Encontra o faturamento máximo
  const maxRevenue = Math.max(...daysWithRevenue.map((day) => day.value));

  // Calcula a média de faturamento diário
  const totalRevenue = daysWithRevenue.reduce((sum, day) => sum + day.value, 0);
  const averageRevenue = totalRevenue / daysWithRevenue.length;

  // Conta os dias com faturamento acima da média
  const daysAboveAverage = daysWithRevenue.filter(
    (day) => day.value > averageRevenue
  ).length;

  return {
    minRevenue,
    maxRevenue,
    daysAboveAverage,
  };
}

// Exibe os resultados da análise de faturamento
function displayRevenueAnalysis(results) {
  console.log("Análise de Faturamento Diário:");
  console.log(`Faturamento mínimo: R$ ${results.minRevenue.toFixed(2)}`);
  console.log(`Faturamento máximo: R$ ${results.maxRevenue.toFixed(2)}`);
  console.log(
    `Número de dias com faturamento acima da média mensal: ${results.daysAboveAverage}`
  );
}

// Carrega e analisa os dados de faturamento
const revenueData = loadJsonData("questao3-json.json");
const analysisResults = analyzeRevenue(revenueData);

// Exibe os resultados da análise
displayRevenueAnalysis(analysisResults);
```

## Questão 4:
Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado: 
•	SP – R$67.836,43 
•	RJ – R$36.678,66 
•	MG – R$29.229,88 
•	ES – R$27.165,48 
•	Outros – R$19.849,53 

Escreva um programa na linguagem que desejar onde calcule o percentual de representação que cada estado teve dentro do valor total mensal da distribuidora. 

**Resposta:** Foram considerados 27 estados brasileiros (se contar Brasília).
A propriedade "Outros" representam um montante de 23 estados.
O código feito em JavaScript está representado abaixo.

```javascript
function calculatePercentages(revenueByState) {
    // Calcula a receita total
    const totalRevenue = Object.values(revenueByState).reduce((sum, value) => sum + value, 0);
    
    // Calcula as porcentagens
    const percentages = {};
    
    for (const state in revenueByState) {
        const percentage = (revenueByState[state] / totalRevenue) * 100;
        percentages[state] = percentage;
    }
    
    // Ajusta a porcentagem de "Outros"
    const mainStates = ["SP", "RJ", "MG", "ES"];
    const percentageOthers = (percentages["Outros"] / (27 - mainStates.length)) * 100;
    percentages["Outros"] = percentageOthers;
    
    return { percentages, totalRevenue };
}

// Dados de receita por estado
const revenueByState = {
    "SP": 67836.43,
    "RJ": 36678.66,
    "MG": 29229.88,
    "ES": 27165.48,
    "Outros": 19849.53
};

const { percentages, totalRevenue } = calculatePercentages(revenueByState);

console.log("Representação percentual por estado:");
for (const state in percentages) {
    console.log(`${state}: ${percentages[state].toFixed(2)}%`);
}
console.log(`Receita total: R$ ${totalRevenue.toFixed(2)}`);
```

## Questão 5:
Escreva um programa que inverta os caracteres de um string. 

IMPORTANTE: 
a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código; 
b) Evite usar funções prontas, como, por exemplo, reverse; 

**Resposta:** Usar um for para navegar de trás para frente.
Segue abaixo código em JavaScript.

```javascript
function reverseString(str) {
    let result = '';
    
    // Percorre a string de trás para frente
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    
    return result;
}

// Exemplo de uso
const originalString = "Target Sistemas";
const reversedString = reverseString(originalString);

console.log(`String original: ${originalString}`);
console.log(`String invertida: ${reversedString}`);
```
