/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TicketDetailComponent from '@/entities/ticket/ticket-details.vue';
import TicketClass from '@/entities/ticket/ticket-details.component';
import TicketService from '@/entities/ticket/ticket.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Ticket Management Detail Component', () => {
    let wrapper: Wrapper<TicketClass>;
    let comp: TicketClass;
    let ticketServiceStub: SinonStubbedInstance<TicketService>;

    beforeEach(() => {
      ticketServiceStub = sinon.createStubInstance<TicketService>(TicketService);

      wrapper = shallowMount<TicketClass>(TicketDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { ticketService: () => ticketServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundTicket = { id: 123 };
        ticketServiceStub.find.resolves(foundTicket);

        // WHEN
        comp.retrieveTicket(123);
        await comp.$nextTick();

        // THEN
        expect(comp.ticket).toBe(foundTicket);
      });
    });
  });
});
