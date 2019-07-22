import PhoneComponent from '../src/components/component';
import checkSnapShot from './utils/checkSnapShot';
describe('component creation', (): void => {
    it('snapshot test for creation component in normal state', (): void => {
        const component = new PhoneComponent('+7(985)0II-**-**');
        const componentHtmlElement = component.createComponent();
        checkSnapShot(componentHtmlElement.outerHTML, 'createComponent_normal');
    });
    it('snapshot test for creation component in error state', (): void => {
        const component = new PhoneComponent('+7(985)0II-**-**', {error: true});
        const componentHtmlElement = component.createComponent();
        checkSnapShot(componentHtmlElement.outerHTML, 'createComponent_error');
    });
});
