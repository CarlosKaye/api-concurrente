// Funcion General (logica y funcional)
var divisible = (N,M) => {
    return N % M == 0;
};

// Wrapper
var esPar = (N) =>{
    return divisible(N,2);
};

// Middleware
var mesPar = (N) =>{
    console.log("Se llama a esPar");
    return esPar(N);
};

R = divisible(10,5);
console.log(R);

R = esPar(10);
console.log(R);

R = mesPar(10);
console.log(R);