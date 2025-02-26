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
