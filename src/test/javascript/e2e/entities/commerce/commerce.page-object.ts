import { element, by, ElementFinder } from 'protractor';

export class CommerceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commerce div table .btn-danger'));
  title = element.all(by.css('jhi-commerce div h2#page-heading span')).first();
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

export class CommerceUpdatePage {
  pageTitle = element(by.id('jhi-commerce-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  adressInput = element(by.id('field_adress'));
  notationCommerceInput = element(by.id('field_notationCommerce'));
  typeSelect = element(by.id('field_type'));

  productSelect = element(by.id('field_product'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAdressInput(adress: string): Promise<void> {
    await this.adressInput.sendKeys(adress);
  }

  async getAdressInput(): Promise<string> {
    return await this.adressInput.getAttribute('value');
  }

  async setNotationCommerceInput(notationCommerce: string): Promise<void> {
    await this.notationCommerceInput.sendKeys(notationCommerce);
  }

  async getNotationCommerceInput(): Promise<string> {
    return await this.notationCommerceInput.getAttribute('value');
  }

  async setTypeSelect(type: string): Promise<void> {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect(): Promise<string> {
    return await this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption(): Promise<void> {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }

  async productSelectLastOption(): Promise<void> {
    await this.productSelect.all(by.tagName('option')).last().click();
  }

  async productSelectOption(option: string): Promise<void> {
    await this.productSelect.sendKeys(option);
  }

  getProductSelect(): ElementFinder {
    return this.productSelect;
  }

  async getProductSelectedOption(): Promise<string> {
    return await this.productSelect.element(by.css('option:checked')).getText();
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

export class CommerceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commerce-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commerce'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
