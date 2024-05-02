import { Routes } from '@angular/router';
import { RedirectHandler } from 'undici';
import { LoginComponent } from './loginlogoff/login/login.component';
import { LayoutComponent } from './loginlogoff/login/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './loginlogoff/login/register/register.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { AppComponent } from './app.component';
import { AuthService } from './guards/auth';
import { authguardGuard } from './guards/authguard.guard';
import { GateComponent } from './gates/gate/gate.component';
import { DataComponent } from './introdata/data/data.component';
import { SdataComponent } from './showdata/sdata/sdata.component';




export const routes: Routes = [
    { path: '',  redirectTo:'gate', pathMatch: 'full' },
    {path: 'gate', component: GateComponent},
    { path: 'login', component: LoginComponent, },
    { path: 'layout', component: LayoutComponent,  children: [
        { path: 'dashboard', component: DashboardComponent, }
    ] },
    { path: 'register', component: RegisterComponent},
    { path: 'contenido', component: ContenidoComponent},
    {path: 'data', component: DataComponent},
    {path: 'sdata', component: SdataComponent}
]