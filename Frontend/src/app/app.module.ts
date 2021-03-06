import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarRatingModule } from 'angular-star-rating';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { ItemAreaComponent } from './item-area/item-area.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './api.service';
import { SearchService } from './search.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { RoleGuardService } from './role-guard.service';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EmployeepanelComponent } from './employeepanel/employeepanel.component';
import { LoadingInterceptor } from './LoadingInterceptor';
import { LoadingComponent } from './loading/loading.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { LocalstorageService } from './localstorage.service';
import { MediaInfoComponent } from './media-info/media-info.component';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './AuthInterceptor';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VerifyComponent } from './verify/verify.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { OrderInformationComponent } from './order-information/order-information.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    ItemAreaComponent,
    ProductPageComponent,
    LoginModalComponent,
    ControlpanelComponent,
    TabComponent,
    TabsComponent,
    InventoryComponent,
    EmployeepanelComponent,
    LoadingComponent,
    HomePageComponent,
    RegistrationComponent,
    MediaInfoComponent,
    ModalComponent,
    CartPageComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    NotFoundComponent,
    VerifyComponent,
    StarRatingComponent,
    OrderInformationComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['3.234.246.29:8081', '3.234.246.29'],
        blacklistedRoutes: ['3.234.246.29:8081/api/auth/', 'localhost:8081']
      }
    }),
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'search', component: ItemAreaComponent},
      {path: 'verify', component: VerifyComponent},
      {path: 'product/:id',  component: ProductPageComponent},
      {path: 'register', component: RegistrationComponent},
      {path: 'controlpanel', component: ControlpanelComponent , canActivate: [RoleGuardService], data: {neededRole: 'Employee'} },
      {path: 'login', component: LoginModalComponent},
      {path: 'cart', component: CartPageComponent, canActivate: [AuthGuard]},
      {path: 'order_history', component: OrderHistoryComponent, canActivate: [AuthGuard]},
      {path: 'order_details', component: OrderDetailsComponent},
      {path: 'forgotpassword', component: ForgotpasswordComponent},
      {path: '**', component: NotFoundComponent}
    ]),
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    ApiService,
    SearchService,
    LocalstorageService,
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
