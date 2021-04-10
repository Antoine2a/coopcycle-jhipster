import { element, by, ElementFinder } from 'protractor';

export class CourseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-course div table .btn-danger'));
  title = element.all(by.css('jhi-course div h2#page-heading span')).first();
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

export class CourseUpdatePage {
  pageTitle = element(by.id('jhi-course-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idCourseInput = element(by.id('field_idCourse'));

  basketSelect = element(by.id('field_basket'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdCourseInput(idCourse: string): Promise<void> {
    await this.idCourseInput.sendKeys(idCourse);
  }

  async getIdCourseInput(): Promise<string> {
    return await this.idCourseInput.getAttribute('value');
  }

  async basketSelectLastOption(): Promise<void> {
    await this.basketSelect.all(by.tagName('option')).last().click();
  }

  async basketSelectOption(option: string): Promise<void> {
    await this.basketSelect.sendKeys(option);
  }

  getBasketSelect(): ElementFinder {
    return this.basketSelect;
  }

  async getBasketSelectedOption(): Promise<string> {
    return await this.basketSelect.element(by.css('option:checked')).getText();
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

export class CourseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-course-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-course'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
