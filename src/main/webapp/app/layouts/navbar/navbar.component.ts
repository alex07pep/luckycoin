import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import {JhiLanguageHelper, Principal, LoginModalService, LoginService, Account} from '../../shared';

import { VERSION } from '../../app.constants';
import {CreditMySuffix} from '../../entities/credit-my-suffix';
import {CreditMySuffixService} from '../../entities/credit-my-suffix/credit-my-suffix.service';
import {HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {AuthServerProvider} from '../../shared/auth/auth-jwt.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    account: Account;
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    myCredit: CreditMySuffix[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private currentInterval: number;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private authServerProvider: AuthServerProvider,
        private creditService: CreditMySuffixService

    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.subscription = this.route.params.subscribe((params) => {
            this.principal.identity().then((account) => {
                this.loadCredit();
            });
        });
        this.registerChangeInCredits();
    }

    public updateCreditIntervalMethodCall() {
        if (this.isAuthenticated() === true) {
            this.currentInterval = window.setInterval(() => {
                this.loadCredit();
                // alert('working');
            }, 2000);
        }
    }

    loadCredit() {
        if (this.isAuthenticated() === true) {
            this.creditService.query().subscribe(
                (res: HttpResponse<CreditMySuffix[]>) => {
                    this.myCredit = res.body;
                },
            );
        }
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.loadCredit();
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
    registerChangeInCredits() {
        this.eventSubscriber = this.eventManager.subscribe('creditListModification', (response) => this.loadCredit());
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.loadCredit();
                this.updateCreditIntervalMethodCall();
            });
        });
    }
}
