import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class TicketUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('sopraSteriaApp.ticket.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  titleInput: ElementFinder = element(by.css('input#ticket-title'));

  descriptionInput: ElementFinder = element(by.css('input#ticket-description'));

  dueDateInput: ElementFinder = element(by.css('input#ticket-dueDate'));

  doneInput: ElementFinder = element(by.css('input#ticket-done'));
  projectSelect = element(by.css('select#ticket-project'));

  assignedToSelect = element(by.css('select#ticket-assignedTo'));

  labelSelect = element(by.css('select#ticket-label'));
}
