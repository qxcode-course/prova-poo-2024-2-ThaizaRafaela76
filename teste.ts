//function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa {
    private dinheiro: number;
    private nome: string;

    constructor(dinheiro: number, nome: string) {
        this.dinheiro = dinheiro;
        this.nome = nome;
    }

    public getNome(): string {
        return this.nome;
    }
    public setNome(nome: string): void {
        this.nome = nome;
    }
    public getDinheiro(): number {
        return this.dinheiro;
    }
    public setDinheiro(dinheiro: number): void {
        this.dinheiro = dinheiro;
    }

    public toString(): string {
        return `${this.nome}:${this.dinheiro}`;
    }
}

class Moto {
    private custo: number;
    private passageiro: Pessoa | null;
    private motorista: Pessoa | null;

    constructor() {
      this.custo = 0;
      this.passageiro = null;
      this.motorista = null;

    }

    public getCusto(): number {
        return this.custo;
    }
    public setCusto(custo: number): void {
        this.custo = custo;
    }
    public getPassageiro(): Pessoa | null {
        return this.passageiro;
    }
    public setPassageiro(passageiro: Pessoa): void {
        if ( this.getMotorista() !== null) {
            this.passageiro = passageiro;
        }
        else {
            console.log("Nao tem Motorista");
        }   
    }
    public getMotorista(): Pessoa | null {
        return this.motorista;
    }
    public setMotorista(motorista: Pessoa): void {
        this.motorista = motorista;
    }

    public drive(distancia: number): void {
        if(this.passageiro !== null){
            if(this.motorista !== null){
              this.custo += distancia; 
            }
        }
    }
// Verifica se o Passageiro é nulo 
// Se o Passageiro não for nulo e tiver dinheiro:
// 
// 
    public leavePass() {
        if ( this.passageiro !== null && this.motorista !== null) {
            if ( this.passageiro.getDinheiro() >= this.custo) {
                //Coloca o novo valor do dinheiro que o passageito tem que é o dinheiro do passageiro - o custo
                this.passageiro.setDinheiro(this.passageiro.getDinheiro() - this.custo); 
                this.motorista.setDinheiro(this.motorista.getDinheiro() + this.custo);
                this.setCusto(0);
                
            }
            else {
                this.motorista.setDinheiro(this.motorista.getDinheiro() + this.custo);
                this.passageiro.setDinheiro(0);
                this.setCusto(0);
                console.log("fail: Passenger does not have enough money");
            }
            console.log(`${this.passageiro.toString()} leave`);
            let tempoPassageiro = this.passageiro;
            this.passageiro = null;
            return tempoPassageiro;
        }
    }
    public toString() {
        let strMotorista  = ()=>{return this.motorista!==null ? this.motorista.toString() : "None"};
        let strPassageiro = ()=>{return this.passageiro!==null ? this.passageiro.toString() : "None"}
       
        return `Cost:${this.custo}, Driver:${strMotorista()}, Passenger:${strPassageiro()}`;

    }
}


class Adapter {
    moto: Moto = new Moto();
    setDriver(name: string, money: number): void {
        let motorista: Pessoa = new Pessoa(money, name);
        this.moto.setMotorista(motorista);
    }

    setPassenger(name: string, money: number): void {
        let passageiro: Pessoa = new Pessoa(money, name);
        this.moto.setPassageiro(passageiro);
    }

    drive(distance: number): void {
        this.moto.drive(distance);
    }

    leavePassenger(): void {
        this.moto.leavePass();
    }

    show(): void {
       console.log(`${this.moto.toString()}`);
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
