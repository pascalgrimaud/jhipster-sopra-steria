import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class LabelUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('sopraSteriaApp.label.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  labelInput: ElementFinder = element(by.css('input#label-label'));
}
