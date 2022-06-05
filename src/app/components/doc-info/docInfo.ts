import { DocumentacaoTutorial } from "./documentacaoTutorial";

export class DocInfo {
    nome: String;
    arrayDocTutorial:Array<DocumentacaoTutorial>;

    constructor(nome) {
        this.nome = nome;
        this.arrayDocTutorial = [];
    }
}