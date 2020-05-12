import { EventEmitter } from "@angular/core";

//outras partes da aplicacao pode usar este service para publicar suas mensagens
//o snackbar vai se inscrever neste service e quando a msg chegar ele vai estar ouvindo e ele ativa 
//a animação para poder aparecer a msg na tela

export class NotificationService {
    // o obj que ele vai emitir é do tipo string
    notifier = new EventEmitter<string>()

    //outras partes da app possa usar
    notify(message: string){
        this.notifier.emit(message)
    }


}