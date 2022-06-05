import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bem-vindo/',
    pathMatch: 'full'
  },
  {
    path: 'decreto/:id',
    loadChildren: () => import('./decreto/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'sobre-app/:id',
    loadChildren: () => import('./sobre-app/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'consulta-plano-orcamentario/:id',
    loadChildren: () => import('./consulta-plano-orcamentario/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'bem-vindo/:id',
    loadChildren: () => import('./bem-vindo/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'plano-orcamentario/:id',
    loadChildren: () => import('./plano-orcamentario/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
