let number = 55;
let message: string = 'Hell, World!';
console.log(message,number);

//intefaccia IProdotto
interface IProdotto{
    type: string;
    ID: number;
    size: string;
    assegnaCliente(cliente: ICliente): void;
}

//interfaccia Icliente
interface ICliente{
    name: string;
    surname: string;
    email: string;
    payMethod: string;
    ordinaProdotto(prodotto: IProdotto):void;
}

//interfaccia IProcessoProduzione

interface IProcessoProduzione{
    processName: string;
    description: string;
    productInProduction: IProdotto[];
    aggiungiProdotto(prodotto: IProdotto):void;
}

// Classe prodotto
// Classe Cliente
// Classe processoProduzione