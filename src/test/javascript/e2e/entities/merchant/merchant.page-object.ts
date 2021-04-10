import { element, by, ElementFinder } from 'protractor';

export class MerchantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-merchant div table .btn-danger'));
  title = element.all(by.css('jhi-merchant div h2#page-heading span')).first();
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

export class MerchantUpdatePage {
  pageTitle = element(by.id('jhi-merchant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  userCoopcycleSelect = element(by.id('field_userCoopcycle'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

export class MerchantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-merchant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-merchant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
