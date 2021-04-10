import { element, by, ElementFinder } from 'protractor';

export class BasketComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-basket div table .btn-danger'));
  title = element.all(by.css('jhi-basket div h2#page-heading span')).first();
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

export class BasketUpdatePage {
  pageTitle = element(by.id('jhi-basket-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  totalpriceInput = element(by.id('field_totalprice'));
  destinationInput = element(by.id('field_destination'));

  userCoopcycleSelect = element(by.id('field_userCoopcycle'));
  commerceSelect = element(by.id('field_commerce'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTotalpriceInput(totalprice: string): Promise<void> {
    await this.totalpriceInput.sendKeys(totalprice);
  }

  async getTotalpriceInput(): Promise<string> {
    return await this.totalpriceInput.getAttribute('value');
  }

  async setDestinationInput(destination: string): Promise<void> {
    await this.destinationInput.sendKeys(destination);
  }

  async getDestinationInput(): Promise<string> {
    return await this.destinationInput.getAttribute('value');
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

  async commerceSelectLastOption(): Promise<void> {
    await this.commerceSelect.all(by.tagName('option')).last().click();
  }

  async commerceSelectOption(option: string): Promise<void> {
    await this.commerceSelect.sendKeys(option);
  }

  getCommerceSelect(): ElementFinder {
    return this.commerceSelect;
  }

  async getCommerceSelectedOption(): Promise<string> {
    return await this.commerceSelect.element(by.css('option:checked')).getText();
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

export class BasketDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-basket-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-basket'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
