import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommerceComponentsPage, CommerceDeleteDialog, CommerceUpdatePage } from './commerce.page-object';

const expect = chai.expect;

describe('Commerce e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commerceComponentsPage: CommerceComponentsPage;
  let commerceUpdatePage: CommerceUpdatePage;
  let commerceDeleteDialog: CommerceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Commerce', async () => {
    await navBarPage.goToEntity('commerce');
    commerceComponentsPage = new CommerceComponentsPage();
    await browser.wait(ec.visibilityOf(commerceComponentsPage.title), 5000);
    expect(await commerceComponentsPage.getTitle()).to.eq('myblogApp.commerce.home.title');
    await browser.wait(ec.or(ec.visibilityOf(commerceComponentsPage.entities), ec.visibilityOf(commerceComponentsPage.noResult)), 1000);
  });

  it('should load create Commerce page', async () => {
    await commerceComponentsPage.clickOnCreateButton();
    commerceUpdatePage = new CommerceUpdatePage();
    expect(await commerceUpdatePage.getPageTitle()).to.eq('myblogApp.commerce.home.createOrEditLabel');
    await commerceUpdatePage.cancel();
  });

  it('should create and save Commerce', async () => {
    const nbButtonsBeforeCreate = await commerceComponentsPage.countDeleteButtons();

    await commerceComponentsPage.clickOnCreateButton();

    await promise.all([
      commerceUpdatePage.setAdressInput('adress'),
      commerceUpdatePage.setNotationCommerceInput('5'),
      commerceUpdatePage.typeSelectLastOption(),
      // commerceUpdatePage.productSelectLastOption(),
    ]);

    expect(await commerceUpdatePage.getAdressInput()).to.eq('adress', 'Expected Adress value to be equals to adress');
    expect(await commerceUpdatePage.getNotationCommerceInput()).to.eq('5', 'Expected notationCommerce value to be equals to 5');

    await commerceUpdatePage.save();
    expect(await commerceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await commerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Commerce', async () => {
    const nbButtonsBeforeDelete = await commerceComponentsPage.countDeleteButtons();
    await commerceComponentsPage.clickOnLastDeleteButton();

    commerceDeleteDialog = new CommerceDeleteDialog();
    expect(await commerceDeleteDialog.getDialogTitle()).to.eq('myblogApp.commerce.delete.question');
    await commerceDeleteDialog.clickOnConfirmButton();

    expect(await commerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
