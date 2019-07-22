import PhoneComponent from '../src/components/component';
import checkSnapShot from './utils/checkSnapShot';
describe('component set state', (): void => {
    it('snapshot test for set component in error state', (): void => {
        // по умолчанию this.state.error = false
        const component = new PhoneComponent('+7(985)0II-**-**');
        const componentHtmlElement = component.createComponent();
        document.body.appendChild(componentHtmlElement);

        // изменили состояние компонента
        component.setState({error: true});
        checkSnapShot(componentHtmlElement.outerHTML, 'setState');
    });
});
