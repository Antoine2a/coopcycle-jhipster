import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CourseComponentsPage, CourseDeleteDialog, CourseUpdatePage } from './course.page-object';

const expect = chai.expect;

describe('Course e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let courseComponentsPage: CourseComponentsPage;
  let courseUpdatePage: CourseUpdatePage;
  let courseDeleteDialog: CourseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Courses', async () => {
    await navBarPage.goToEntity('course');
    courseComponentsPage = new CourseComponentsPage();
    await browser.wait(ec.visibilityOf(courseComponentsPage.title), 5000);
    expect(await courseComponentsPage.getTitle()).to.eq('myblogApp.course.home.title');
    await browser.wait(ec.or(ec.visibilityOf(courseComponentsPage.entities), ec.visibilityOf(courseComponentsPage.noResult)), 1000);
  });

  it('should load create Course page', async () => {
    await courseComponentsPage.clickOnCreateButton();
    courseUpdatePage = new CourseUpdatePage();
    expect(await courseUpdatePage.getPageTitle()).to.eq('myblogApp.course.home.createOrEditLabel');
    await courseUpdatePage.cancel();
  });

  it('should create and save Courses', async () => {
    const nbButtonsBeforeCreate = await courseComponentsPage.countDeleteButtons();

    await courseComponentsPage.clickOnCreateButton();

    await promise.all([courseUpdatePage.setIdCourseInput('5'), courseUpdatePage.basketSelectLastOption()]);

    expect(await courseUpdatePage.getIdCourseInput()).to.eq('5', 'Expected idCourse value to be equals to 5');

    await courseUpdatePage.save();
    expect(await courseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Course', async () => {
    const nbButtonsBeforeDelete = await courseComponentsPage.countDeleteButtons();
    await courseComponentsPage.clickOnLastDeleteButton();

    courseDeleteDialog = new CourseDeleteDialog();
    expect(await courseDeleteDialog.getDialogTitle()).to.eq('myblogApp.course.delete.question');
    await courseDeleteDialog.clickOnConfirmButton();

    expect(await courseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
