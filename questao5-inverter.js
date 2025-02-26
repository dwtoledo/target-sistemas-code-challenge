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