const funciones = new Set(["sin", "cos", "tan", "log", "ln", "sqrt", "abs"]);

function tokenizar(expresion: string) {
  const tokens: string[] = [];
  let posicion = 0;

  while (posicion < expresion.length) {
    const restante = expresion.slice(posicion);
    if (/^\s/.test(restante)) {
      posicion += 1;
      continue;
    }

    const numero = restante.match(/^(?:\d+(?:\.\d*)?|\.\d+)/);
    if (numero) {
      tokens.push(numero[0]);
      posicion += numero[0].length;
      continue;
    }

    const palabra = restante.match(/^[a-z]+/i);
    if (palabra) {
      const token = palabra[0].toLowerCase();
      if (!funciones.has(token)) throw new Error("Función desconocida");
      tokens.push(token);
      posicion += palabra[0].length;
      continue;
    }

    const simbolo = restante[0];
    if ("πe()+−-×÷*/^%![]{}".includes(simbolo)) {
      tokens.push(simbolo === "-" ? "−" : simbolo === "*" ? "×" : simbolo === "/" ? "÷" : simbolo);
      posicion += 1;
      continue;
    }

    throw new Error("Símbolo no válido");
  }

  return tokens;
}

export function evaluarExpresion(expresion: string) {
  const tokens = tokenizar(expresion);
  let posicion = 0;

  const mirar = () => tokens[posicion];
  const tomar = (esperado?: string) => {
    const token = tokens[posicion];
    if (!token || (esperado && token !== esperado)) throw new Error("Expresión incompleta");
    posicion += 1;
    return token;
  };

  const expresionAditiva = (): number => {
    let resultado = expresionMultiplicativa();
    while (mirar() === "+" || mirar() === "−") {
      const operador = tomar();
      const siguiente = expresionMultiplicativa();
      resultado = operador === "+" ? resultado + siguiente : resultado - siguiente;
    }
    return resultado;
  };

  const comienzaTermino = (token?: string) =>
    token !== undefined &&
    (/^(?:\d|\.)/.test(token) || ["π", "e", "(", "[", "{"].includes(token) || funciones.has(token));

  const expresionMultiplicativa = (): number => {
    let resultado = expresionUnaria();
    while (true) {
      const operador = mirar();
      if (["×", "÷"].includes(operador)) {
        tomar();
        const siguiente = expresionUnaria();
        if (operador === "÷" && siguiente === 0) throw new Error("División por cero");
        resultado = operador === "×" ? resultado * siguiente : resultado / siguiente;
      } else if (comienzaTermino(operador)) {
        resultado *= expresionUnaria();
      } else {
        return resultado;
      }
    }
  };

  const expresionUnaria = (): number => {
    if (mirar() === "+") {
      tomar();
      return expresionUnaria();
    }
    if (mirar() === "−") {
      tomar();
      return -expresionUnaria();
    }
    return expresionPotencia();
  };

  const expresionPotencia = (): number => {
    const base = expresionPostfija();
    if (mirar() === "^") {
      tomar();
      return base ** expresionUnaria();
    }
    return base;
  };

  const expresionPostfija = (): number => {
    let resultado = expresionPrimaria();
    while (mirar() === "!" || mirar() === "%") {
      const operador = tomar();
      if (operador === "%") {
        resultado /= 100;
      } else {
        if (!Number.isInteger(resultado) || resultado < 0 || resultado > 170) {
          throw new Error("Factorial fuera de rango");
        }
        let factorial = 1;
        for (let factor = 2; factor <= resultado; factor += 1) factorial *= factor;
        resultado = factorial;
      }
    }
    return resultado;
  };

  const grupo = (apertura: string): number => {
    const cierre = apertura === "(" ? ")" : apertura === "[" ? "]" : "}";
    const resultado = expresionAditiva();
    tomar(cierre);
    return resultado;
  };

  const expresionPrimaria = (): number => {
    const token = mirar();
    if (!token) throw new Error("Falta un operando");

    if (funciones.has(token)) {
      const funcion = tomar();
      const apertura = tomar();
      if (apertura !== "(" && apertura !== "[" && apertura !== "{") {
        throw new Error("Falta abrir la función");
      }
      const argumento = grupo(apertura);
      switch (funcion) {
        case "sin":
          return Math.sin((argumento * Math.PI) / 180);
        case "cos":
          return Math.cos((argumento * Math.PI) / 180);
        case "tan":
          return Math.tan((argumento * Math.PI) / 180);
        case "log":
          return Math.log10(argumento);
        case "ln":
          return Math.log(argumento);
        case "sqrt":
          return Math.sqrt(argumento);
        case "abs":
          return Math.abs(argumento);
      }
    }

    if (token === "(" || token === "[" || token === "{") {
      tomar();
      return grupo(token);
    }
    if (token === "π") {
      tomar();
      return Math.PI;
    }
    if (token === "e") {
      tomar();
      return Math.E;
    }
    if (/^(?:\d|\.)/.test(token)) {
      tomar();
      return Number(token);
    }
    throw new Error("Falta un operando");
  };

  if (tokens.length === 0) throw new Error("Expresión vacía");
  const resultado = expresionAditiva();
  if (posicion !== tokens.length || !Number.isFinite(resultado)) {
    throw new Error("Expresión no válida");
  }
  return resultado;
}