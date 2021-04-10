import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserCoopcycleComponentsPage, UserCoopcycleDeleteDialog, UserCoopcycleUpdatePage } from './user-coopcycle.page-object';

const expect = chai.expect;

describe('UserCoopcycle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userCoopcycleComponentsPage: UserCoopcycleComponentsPage;
  let userCoopcycleUpdatePage: UserCoopcycleUpdatePage;
  let userCoopcycleDeleteDialog: UserCoopcycleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserCoopcycles', async () => {
    await navBarPage.goToEntity('user-coopcycle');
    userCoopcycleComponentsPage = new UserCoopcycleComponentsPage();
    await browser.wait(ec.visibilityOf(userCoopcycleComponentsPage.title), 5000);
    expect(await userCoopcycleComponentsPage.getTitle()).to.eq('myblogApp.userCoopcycle.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(userCoopcycleComponentsPage.entities), ec.visibilityOf(userCoopcycleComponentsPage.noResult)),
      1000
    );
  });

  it('should load create UserCoopcycle page', async () => {
    await userCoopcycleComponentsPage.clickOnCreateButton();
    userCoopcycleUpdatePage = new UserCoopcycleUpdatePage();
    expect(await userCoopcycleUpdatePage.getPageTitle()).to.eq('myblogApp.userCoopcycle.home.createOrEditLabel');
    await userCoopcycleUpdatePage.cancel();
  });

  it('should create and save UserCoopcycles', async () => {
    const nbButtonsBeforeCreate = await userCoopcycleComponentsPage.countDeleteButtons();

    await userCoopcycleComponentsPage.clickOnCreateButton();

    await promise.all([
      userCoopcycleUpdatePage.setNameInput('name'),
      userCoopcycleUpdatePage.setSurnameInput('surname'),
      userCoopcycleUpdatePage.setEmailInput('s$&#39;{`2@(sD.[wC'),
      userCoopcycleUpdatePage.setPhoneInput('phone'),
      userCoopcycleUpdatePage.commerceSelectLastOption(),
      userCoopcycleUpdatePage.cooperativeSelectLastOption(),
    ]);

    expect(await userCoopcycleUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await userCoopcycleUpdatePage.getSurnameInput()).to.eq('surname', 'Expected Surname value to be equals to surname');
    expect(await userCoopcycleUpdatePage.getEmailInput()).to.eq(
      's$&#39;{`2@(sD.[wC',
      'Expected Email value to be equals to s$&#39;{`2@(sD.[wC'
    );
    expect(await userCoopcycleUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');

    await userCoopcycleUpdatePage.save();
    expect(await userCoopcycleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userCoopcycleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserCoopcycle', async () => {
    const nbButtonsBeforeDelete = await userCoopcycleComponentsPage.countDeleteButtons();
    await userCoopcycleComponentsPage.clickOnLastDeleteButton();

    userCoopcycleDeleteDialog = new UserCoopcycleDeleteDialog();
    expect(await userCoopcycleDeleteDialog.getDialogTitle()).to.eq('myblogApp.userCoopcycle.delete.question');
    await userCoopcycleDeleteDialog.clickOnConfirmButton();

    expect(await userCoopcycleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
