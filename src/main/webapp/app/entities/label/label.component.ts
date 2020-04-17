import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILabel } from '@/shared/model/label.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import LabelService from './label.service';

@Component
export default class Label extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('labelService') private labelService: () => LabelService;
  private removeId: number = null;

  public labels: ILabel[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLabels();
  }

  public clear(): void {
    this.retrieveAllLabels();
  }

  public retrieveAllLabels(): void {
    this.isFetching = true;

    this.labelService()
      .retrieve()
      .then(
        res => {
          this.labels = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ILabel): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLabel(): void {
    this.labelService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('sopraSteriaApp.label.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllLabels();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
