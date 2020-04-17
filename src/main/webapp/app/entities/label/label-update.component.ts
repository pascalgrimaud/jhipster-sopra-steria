import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import TicketService from '../ticket/ticket.service';
import { ITicket } from '@/shared/model/ticket.model';

import AlertService from '@/shared/alert/alert.service';
import { ILabel, Label } from '@/shared/model/label.model';
import LabelService from './label.service';

const validations: any = {
  label: {
    label: {
      required,
      minLength: minLength(3)
    }
  }
};

@Component({
  validations
})
export default class LabelUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('labelService') private labelService: () => LabelService;
  public label: ILabel = new Label();

  @Inject('ticketService') private ticketService: () => TicketService;

  public tickets: ITicket[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.label.id) {
      this.labelService()
        .update(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sopraSteriaApp.label.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.labelService()
        .create(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('sopraSteriaApp.label.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLabel(labelId): void {
    this.labelService()
      .find(labelId)
      .then(res => {
        this.label = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.ticketService()
      .retrieve()
      .then(res => {
        this.tickets = res.data;
      });
  }
}
