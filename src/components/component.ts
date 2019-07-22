import {
    PhoneComponentClass,
    PhoneComponentState,
    ComponentValue,
} from '../interfaces/IComponent';

import {
    PhoneComponentElementsProps,
    ComponentElementType,
} from '../interfaces/IComponentElement';
import InputElement from '../components/inputElement';
import SpanElement from '../components/spanElement';
import parseMask from '../utils/maskParser';

export default class PhoneComponent implements PhoneComponentClass {
    private mask: string;
    private state: PhoneComponentState;

    public constructor(
        mask: string,
        state: PhoneComponentState = {error: false}
    ) {
        this.mask = mask;
        this.state = state;
    }

    public setState({error = false}): void {
        if (error !== this.state.error) {
            const newInputStyle = error ?
                'phone-block__input_error' :
                'phone-block__input_normal';
            const prevInputStyle = error ?
                'phone-block__input_normal' :
                'phone-block__input_error';

            const elementsToChange: NodeListOf<HTMLInputElement> = document
                .querySelectorAll(
                    `.phone-block__input > .${prevInputStyle}`
                );

            elementsToChange.forEach((elem: HTMLInputElement): void => {
                elem.className = newInputStyle;
            });

            const errorMsg: HTMLInputElement = document.querySelector(
                '.phone-block__error-message'
            ) as HTMLInputElement;
            error ?
                errorMsg.classList.remove('phone-block__error-message_hide') :
                errorMsg.classList.add('phone-block__error-message_hide');

            this.state.error = error;
        }
    }

    public getComponentValue(): ComponentValue {
        const result: ComponentValue = {
            maskNumber: '',
            rawNumber: '',
        };
        let inputPointer = 0;
        const inputStyle = this.state.error ?
            'phone-block__input_error' :
            'phone-block__input_normal';

        const elementsToHarvest: NodeListOf<HTMLInputElement> = document
            .querySelectorAll(
                `.phone-block__input > .${inputStyle}`
            );

        for (const elem of this.mask) {
            if (elem === 'I') {
                result.maskNumber +=
                    elementsToHarvest[inputPointer].value.length ?
                        elementsToHarvest[inputPointer].value :
                        'I';
                result.rawNumber += elementsToHarvest[inputPointer].value;
                inputPointer += 1;
            } else {
                result.maskNumber += elem;
            }
        }
        return result;
    }

    public createComponent(): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        const phoneBlock: HTMLDivElement = document.createElement('div');
        phoneBlock.className = 'phone-block';

        const arrayOfElementsProps: PhoneComponentElementsProps[] =
                                        parseMask(this.mask, this.state.error);
        arrayOfElementsProps.forEach(
            (props: PhoneComponentElementsProps): void => {
                if (props.element === 'input') {
                    const input: ComponentElementType =
                        InputElement.createElement(props);
                    phoneBlock.appendChild(input);
                } else {
                    const span: ComponentElementType =
                        SpanElement.createElement(props);
                    phoneBlock.appendChild(span);
                }
            });

        const errorMsg: HTMLDivElement = document.createElement('div');
        errorMsg.className = 'phone-block';

        const errorMsgSpan: HTMLSpanElement = document.createElement('span');
        errorMsgSpan.classList.add('phone-block__error-message');
        if (!this.state.error) {
            errorMsgSpan.classList.add('phone-block__error-message_hide');
        }
        errorMsgSpan.innerText = 'Неверный номер, попробуйте еще раз';
        errorMsg.appendChild(errorMsgSpan);

        container.appendChild(phoneBlock);
        container.appendChild(errorMsg);
        return container;
    }
};
