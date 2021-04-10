import { element, by, ElementFinder } from 'protractor';

export class UserCoopcycleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-user-coopcycle div table .btn-danger'));
  title = element.all(by.css('jhi-user-coopcycle div h2#page-heading span')).first();
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

export class UserCoopcycleUpdatePage {
  pageTitle = element(by.id('jhi-user-coopcycle-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  surnameInput = element(by.id('field_surname'));
  emailInput = element(by.id('field_email'));
  phoneInput = element(by.id('field_phone'));

  commerceSelect = element(by.id('field_commerce'));
  cooperativeSelect = element(by.id('field_cooperative'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setSurnameInput(surname: string): Promise<void> {
    await this.surnameInput.sendKeys(surname);
  }

  async getSurnameInput(): Promise<string> {
    return await this.surnameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
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

  async cooperativeSelectLastOption(): Promise<void> {
    await this.cooperativeSelect.all(by.tagName('option')).last().click();
  }

  async cooperativeSelectOption(option: string): Promise<void> {
    await this.cooperativeSelect.sendKeys(option);
  }

  getCooperativeSelect(): ElementFinder {
    return this.cooperativeSelect;
  }

  async getCooperativeSelectedOption(): Promise<string> {
    return await this.cooperativeSelect.element(by.css('option:checked')).getText();
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

export class UserCoopcycleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-userCoopcycle-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-userCoopcycle'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
