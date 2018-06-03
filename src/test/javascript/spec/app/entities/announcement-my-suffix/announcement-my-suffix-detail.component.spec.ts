/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LuckycoinTestModule } from '../../../test.module';
import { AnnouncementMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix-detail.component';
import { AnnouncementMySuffixService } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.service';
import { AnnouncementMySuffix } from '../../../../../../main/webapp/app/entities/announcement-my-suffix/announcement-my-suffix.model';

describe('Component Tests', () => {

    describe('AnnouncementMySuffix Management Detail Component', () => {
        let comp: AnnouncementMySuffixDetailComponent;
        let fixture: ComponentFixture<AnnouncementMySuffixDetailComponent>;
        let service: AnnouncementMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [LuckycoinTestModule],
                declarations: [AnnouncementMySuffixDetailComponent],
                providers: [
                    AnnouncementMySuffixService
                ]
            })
            .overrideTemplate(AnnouncementMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AnnouncementMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnouncementMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AnnouncementMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.announcement).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
