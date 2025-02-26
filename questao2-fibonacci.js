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
