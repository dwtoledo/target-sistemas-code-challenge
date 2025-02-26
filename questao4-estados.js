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