import PhoneForm from '../src/components/form';
import checkSnapShot from './utils/checkSnapShot';
describe('component creation', (): void => {
    it('snapshot test for creation component in normal state', (): void => {
        const component = new PhoneForm('+7(985)0II-**-**');
        const componentHtmlElement = component.createForm();
        checkSnapShot(componentHtmlElement.outerHTML, 'createForm_normal');
    });
    it('snapshot test for creation component in error state', (): void => {
        const component = new PhoneForm('+7(985)0II-**-**', {error: true});
        const componentHtmlElement = component.createForm();
        checkSnapShot(componentHtmlElement.outerHTML, 'createForm_error');
    });
});