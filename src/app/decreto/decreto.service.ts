import { Injectable } from '@angular/core';
import { Decreto } from './decreto';
@Injectable({
    providedIn: 'root',
})
export class DecretoService {
    currentDecreto: Decreto;
    listaDecretos: Array<Decreto>;
    decretoPoliticaDadosAbertosPoderExecutivoFederal = new Decreto('8777-11-05-2016', 'https://pesquisa.in.gov.br/imprensa/jsp/visualiza/index.jsp?data=12/05/2016&jornal=1&pagina=21&totalArquivos=248');

    
    constructor(){
        this.listaDecretos = new Array<Decreto>();
        this.listaDecretos.push(this.decretoPoliticaDadosAbertosPoderExecutivoFederal);
    }
    getDecretoByID(id: String): Decreto {
        for (let i=0;i<this.listaDecretos.length;i++) {
            if (this.listaDecretos[i].id === id) {
                this.setCurrentDecreto(this.listaDecretos[i]);
                return this.currentDecreto;
            }
        }
    }
    setCurrentDecreto(decreto:Decreto) {
        this.currentDecreto = decreto;
        console.log('currentDecreto: ', this.currentDecreto);
    }
    getCurrentDecreto(): Decreto {
        return this.currentDecreto;
    }
    
}