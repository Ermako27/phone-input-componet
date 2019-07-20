import {
    FormElementsProps,
    FormElementClass,
} from '../interfaces/IFormElement';

class InputElement implements FormElementClass {
    public createElement(props: FormElementsProps): HTMLDivElement {
        const div: HTMLDivElement = document.createElement('div');
        div.className = 'phone-block__input';

        const input: HTMLInputElement = document.createElement('input');
        input.type = 'text';
        input.className = props.style;
        if (props.state == 'disabled') {
            input.disabled = true;
            input.value = props.value;
        } else {
            input.placeholder = '_';
            input.maxLength = 1;
        }

        div.appendChild(input);
        return div;
    }
};

export default new InputElement;
