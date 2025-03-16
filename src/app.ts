
//intefaccia IProdotto
interface IProdotto{
    type: string;
    ID: number;
    size: string;
    quantity: number;
    assegnaCliente(cliente: ICliente, pzOrdinati:number): void;
}

//interfaccia Icliente
interface ICliente{
    name: string;
    surname: string;
    email: string;
    payMethod: string;
    ordinaProdotto(prodotto: IProdotto, pzOrdinati:number):void;
}

//interfaccia IProcessoProduzione
interface IProcessoProduzione{
    processName: string;
    description: string;
    productInProduction: IProdotto[];
    aggiungiProdotto(prodotto: IProdotto, pzProdotti: number):void;
}

// Classe prodotto

class Prodotto implements IProdotto{
    type: string;
    ID: number;
    size: string;
    quantity: number;
    private cliente!: ICliente;
    
    constructor(type: string, ID:number, size: string, quantity: number){
        this.type = type;
        this.ID = ID;
        this.size = size;
        this.quantity = quantity;
    }

    assegnaCliente(cliente: ICliente, pzOrdinati:number): void {
        this.cliente = cliente;
        console.log(`il cliente ${cliente.name} é stato assegnato al prodotto ${this.type} ed é stato venduto`)
        console.log(`il cliente ${cliente.name} ha ordinato la seguente quantitá di ${this.type}: ${pzOrdinati} `)
        this.quantity = this.quantity-pzOrdinati
        console.log(`la quantità di ${this.type} in stock é ora di ${this.quantity}`)
    }
}

// Classe Cliente

class Cliente implements ICliente{
    name: string;
    surname: string;
    email: string;
    payMethod: string;

    constructor(name: string, surname: string, email: string, payMethod: string){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.payMethod = payMethod;
    }

    ordinaProdotto(prodotto: IProdotto, pzOrdinati:number): void {
        
        prodotto.assegnaCliente(this, pzOrdinati);
    }
}
// Const enum con i processi produttivi

const enum ProcessiProduttivi{
    Cucitura = 'cucitura',
    Produzione = 'produzione',
    ProntoAllaVendita = 'pronto alla vendita'
}

// Costante tipizzata per associare le descrizioni ai vari processi produttivi

const descrProcessi: Record<ProcessiProduttivi, string> = {
    [ProcessiProduttivi.Cucitura]: "fase produttiva di cucitura",
    [ProcessiProduttivi.Produzione]: "fase centrale della produzione",
    [ProcessiProduttivi.ProntoAllaVendita]: "fase di stoccaggio in negozio retail"
};

// Classe processoProduzione

class processoProduzione implements IProcessoProduzione{
    processName: string;
    description: string;
    productInProduction: IProdotto[];
    
    constructor(processName: ProcessiProduttivi){
        this.processName = processName
        this.description = descrProcessi[processName]
        this.productInProduction = []
    }

    aggiungiProdotto(prodotto: IProdotto,pzProdotti: number): void {

        if (this.processName === 'pronto alla vendita'){ //  se il prodotto é pronto alla vendita si aggiungono in stock i prodotti altrimenti completa solo il processo produttivo
       prodotto.quantity = prodotto.quantity+pzProdotti
       console.log(`N. ${pzProdotti} di ${prodotto.type} ha completato la fase di ${this.processName}`)
       console.log(`La fase di ${this.processName} consiste nella ${this.description}`)
       console.log(`la quantità di ${prodotto.type} in stock é ora di ${prodotto.quantity}`)
        }else{
       console.log(`N. ${pzProdotti} di ${prodotto.type} ha completato la fase di ${this.processName}`)
       console.log(`La fase di ${this.processName} consiste nella ${this.description}`)}
    }
}

// istanzio prodotti, clienti e processi produttivi

let costumeDaUomo = new Prodotto('costume da uomo',110,'M', 3) // Prodotto costume da uomo, codice 110, taglia M, 3 pezzi giá a magazzino
let costumeDaDonna = new Prodotto('bikini',123,'S', 0) // Prodotto costume da donna, codice 123, taglia s, 0 pezzi  a magazzino
let infraditoBlu = new Prodotto('infradito Blu', 335, '39', 20) // Prodotto infradito, codice 335, taglia 39, 20 pezzi giá a magazzino

let cliente1 = new Cliente('mario','rossi','mariorossi@gmail.com','VISA')
let cliente2 = new Cliente('sandra','verdi','sandraverdi@gmail.com','MASTERCARD')


let processo1 = new processoProduzione(ProcessiProduttivi.Cucitura)
let processo2 = new processoProduzione(ProcessiProduttivi.Produzione)
let processo3 = new processoProduzione(ProcessiProduttivi.ProntoAllaVendita)


console.log('Benvenuto in Sunnee!')

// Produco i prodotti

// Processo di produzione Costume da uomo 
console.log('Processo di produzione Costume da uomo')
console.log('--------------------------------------')
processo1.aggiungiProdotto(costumeDaUomo, 25) // cucitura
processo2.aggiungiProdotto(costumeDaUomo, 25) // confezionamento
processo3.aggiungiProdotto(costumeDaUomo, 24) // pronto alla vendita in negozio, un prodotto era fallato

// Processo di produzione Costume da Donna
console.log('--------------------------------------')
console.log('Processo di produzione Costume da donna')
console.log('--------------------------------------')
processo1.aggiungiProdotto(costumeDaDonna, 12) // cucitura
processo2.aggiungiProdotto(costumeDaDonna, 10) // confezionamento, due prodotti fallati
processo3.aggiungiProdotto(costumeDaDonna, 10) // pronto alla vendita in negozio

// Processo di produzione Infradito
console.log('--------------------------------------')
console.log('Processo di produzione Infradito')
console.log('--------------------------------------')
processo2.aggiungiProdotto(infraditoBlu, 8) // confezionamento
processo3.aggiungiProdotto(infraditoBlu, 8) // pronto alla vendita in negozio

console.log('--------------------------------------')
console.log('Fine processo di produzione')
console.log('--------------------------------------')

// Vendo i prodotti

// Processo di vendita Cliente 1
console.log('--------------------------------------')
console.log('Processo di vendita Cliente 1')
console.log('--------------------------------------')
cliente1.ordinaProdotto(costumeDaUomo,1) // il cliente 1 compra un costume da uomo

// Processo di vendita Cliente 2

console.log('--------------------------------------')
console.log('Processo di vendita Cliente 2')
console.log('--------------------------------------')
cliente2.ordinaProdotto(costumeDaDonna,2) // il cliente 2 compra 2 costumi da donna e un infradito
cliente2.ordinaProdotto(infraditoBlu,1)

