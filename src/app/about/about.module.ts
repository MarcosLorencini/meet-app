import { NgModule } from '@angular/core' //transforma a classe em um modulo
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router'


const ROUTES: Routes = [
    {path: '', component: AboutComponent}//caminho defaut apontado para o componente
]

//FAZENDO COM QUE O AboutComponent SEJA CARREGADO ATRAVES DO LAZY-LOADING - carrega o componente apenas quando for utilizá-lo
//O ROUTING é que faz o lazy-loading, quando acionar a rota o componente será carregado naquele momento
//declarations componentes que devem constar dentro deste modulo, tirou o comp no modulo raiz app.modules.ts
@NgModule({// o comp será usado somente detro deste modulo, por isso tiramso ele da raiz
    declarations:[AboutComponent],
    imports: [RouterModule.forChild(ROUTES)]//importa a rota do componente
})
export class AboutModule {

}