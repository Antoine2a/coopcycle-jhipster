import { element, by, ElementFinder } from 'protractor';

export class CourierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-courier div table .btn-danger'));
  title = element.all(by.css('jhi-courier div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CourierUpdatePage {
  pageTitle = element(by.id('jhi-courier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  notationInput = element(by.id('field_notation'));
  latitudeInput = element(by.id('field_latitude'));
  longitudeInput = element(by.id('field_longitude'));

  userCoopcycleSelect = element(by.id('field_userCoopcycle'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNotationInput(notation: string): Promise<void> {
    await this.notationInput.sendKeys(notation);
  }

  async getNotationInput(): Promise<string> {
    return await this.notationInput.getAttribute('value');
  }

  async setLatitudeInput(latitude: string): Promise<void> {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput(): Promise<string> {
    return await this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude: string): Promise<void> {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput(): Promise<string> {
    return await this.longitudeInput.getAttribute('value');
  }

  async userCoopcycleSelectLastOption(): Promise<void> {
    await this.userCoopcycleSelect.all(by.tagName('option')).last().click();
  }

  async userCoopcycleSelectOption(option: string): Promise<void> {
    await this.userCoopcycleSelect.sendKeys(option);
  }

  getUserCoopcycleSelect(): ElementFinder {
    return this.userCoopcycleSelect;
  }

  async getUserCoopcycleSelectedOption(): Promise<string> {
    return await this.userCoopcycleSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CourierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-courier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-courier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
