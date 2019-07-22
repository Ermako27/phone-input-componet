import {storiesOf} from '@storybook/html';
import PhoneComponent from '../src/components/component';
import '../styles/styles.css';


storiesOf('Component', module)
    .add('Normal', (): HTMLDivElement => {
        const mask = '+7(985)0II-**-**';
        const component = new PhoneComponent(mask);
        return component.createComponent();
    })
    .add('Error', (): HTMLDivElement => {
        const mask = '+7(985)0II-**-**';
        const component = new PhoneComponent(mask, {error: true});
        return component.createComponent();
    });
