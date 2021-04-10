import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CourierComponentsPage, CourierDeleteDialog, CourierUpdatePage } from './courier.page-object';

const expect = chai.expect;

describe('Courier e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let courierComponentsPage: CourierComponentsPage;
  let courierUpdatePage: CourierUpdatePage;
  let courierDeleteDialog: CourierDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Couriers', async () => {
    await navBarPage.goToEntity('courier');
    courierComponentsPage = new CourierComponentsPage();
    await browser.wait(ec.visibilityOf(courierComponentsPage.title), 5000);
    expect(await courierComponentsPage.getTitle()).to.eq('myblogApp.courier.home.title');
    await browser.wait(ec.or(ec.visibilityOf(courierComponentsPage.entities), ec.visibilityOf(courierComponentsPage.noResult)), 1000);
  });

  it('should load create Courier page', async () => {
    await courierComponentsPage.clickOnCreateButton();
    courierUpdatePage = new CourierUpdatePage();
    expect(await courierUpdatePage.getPageTitle()).to.eq('myblogApp.courier.home.createOrEditLabel');
    await courierUpdatePage.cancel();
  });

  it('should create and save Couriers', async () => {
    const nbButtonsBeforeCreate = await courierComponentsPage.countDeleteButtons();

    await courierComponentsPage.clickOnCreateButton();

    await promise.all([
      courierUpdatePage.setNotationInput('5'),
      courierUpdatePage.setLatitudeInput('5'),
      courierUpdatePage.setLongitudeInput('5'),
      courierUpdatePage.userCoopcycleSelectLastOption(),
    ]);

    expect(await courierUpdatePage.getNotationInput()).to.eq('5', 'Expected notation value to be equals to 5');
    expect(await courierUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await courierUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');

    await courierUpdatePage.save();
    expect(await courierUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await courierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Courier', async () => {
    const nbButtonsBeforeDelete = await courierComponentsPage.countDeleteButtons();
    await courierComponentsPage.clickOnLastDeleteButton();

    courierDeleteDialog = new CourierDeleteDialog();
    expect(await courierDeleteDialog.getDialogTitle()).to.eq('myblogApp.courier.delete.question');
    await courierDeleteDialog.clickOnConfirmButton();

    expect(await courierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
