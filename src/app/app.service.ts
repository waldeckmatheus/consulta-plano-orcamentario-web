import { Injectable } from '@angular/core';
import { ModalDocumentacoesTutoriaisCtl } from './sobre-app/modalDocumentacoesTutoriaisCtl';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    modalDocumentacoesTutoriaisCtl: ModalDocumentacoesTutoriaisCtl;
    constructor() {

    }
    setModalDocumentacoesTutoriais(modalDocumentacoesTutoriaisCtl: ModalDocumentacoesTutoriaisCtl) {
        this.modalDocumentacoesTutoriaisCtl = modalDocumentacoesTutoriaisCtl;
    }
    getModalDocumentacoesTutoriais() {
        return this.modalDocumentacoesTutoriaisCtl;
    }
    closeModalIfOpen() {
        if (this.modalDocumentacoesTutoriaisCtl !=undefined && this.modalDocumentacoesTutoriaisCtl != null) {
            if (this.modalDocumentacoesTutoriaisCtl.documentacaoTutorialOpen) {
                this.modalDocumentacoesTutoriaisCtl.documentacaoTutorialOpen = false;
            }
        }
    }

}