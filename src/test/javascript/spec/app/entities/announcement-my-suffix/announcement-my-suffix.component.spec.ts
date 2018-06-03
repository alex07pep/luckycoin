/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LuckycoinTestModule } from '../../../test.module';
import { AnnouncementMySuffixComponent } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.component';
import { AnnouncementMySuffixService } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.service';
import { AnnouncementMySuffix } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.model';

describe('Component Tests', () => {

    describe('AnnouncementMySuffix Management Component', () => {
        let comp: AnnouncementMySuffixComponent;
        let fixture: ComponentFixture<AnnouncementMySuffixComponent>;
        let service: AnnouncementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [AnnouncementMySuffixComponent],
                providers: [
                    AnnouncementMySuffixService
                ]
            })
            .overrideTemplate(AnnouncementMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnouncementMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnouncementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AnnouncementMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.announcements[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
