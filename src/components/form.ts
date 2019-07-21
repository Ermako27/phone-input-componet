import {
    MaskLegend,
    FormClass,
    PhoneFormState,
} from '../interfaces/IForm';

import {
    FormElementsProps,
    FormElementType,
} from '../interfaces/IFormElement';
import InputElement from '../components/inputElement';
import SpanElement from '../components/spanElement';


const maskLegend: MaskLegend = {
    'I': {
        style: 'phone-block__input_normal',
        value: '',
        state: 'normal',
        element: 'input',
    },
    'X': {
        style: 'phone-block__input_disabled',
        value: 'X',
        state: 'disabled',
        element: 'input',
    },
    '*': {
        style: 'phone-block__input_disabled',
        value: '●',
        state: 'disabled',
        element: 'input',
    },
};
const nums = '1234567890';

export default class PhoneForm implements FormClass {
    private mask: string;
    private state: PhoneFormState;

    public constructor(mask: string) {
        this.mask = mask;
        this.state = {
            error: false,
        };
    }

    private parseMask(mask: string): FormElementsProps[] {
        const result: FormElementsProps[] = Array.from(mask).reduce(
            (acc: FormElementsProps[], elem: string): FormElementsProps[] => {
                if (elem in maskLegend) {
                    const props: FormElementsProps = {...maskLegend[elem]};
                    acc.push(props);
                    return acc;
                } else if (nums.includes(elem)) {
                    const props: FormElementsProps = {
                        value: elem,
                        style: 'phone-block__input_disabled',
                        state: 'disabled',
                        element: 'input',
                    };
                    acc.push(props);
                    return acc;
                } else {
                    const props: FormElementsProps = {
                        value: elem,
                        style: 'phone-block__symbol-span',
                        element: 'span',
                    };
                    acc.push(props);
                    return acc;
                }
            }, []);
        return result;
    }

    public setState({error = false}): void {
        if (error !== this.state.error) {
            const newInputStyle = error ?
                'phone-block__input_error' :
                'phone-block__input_normal';
            const prevInputStyle = error ?
                'phone-block__input_normal' :
                'phone-block__input_error';

            const elementsToChange: NodeListOf<FormElementType> = document
                .querySelectorAll(
                    `.phone-block__input > .${prevInputStyle}`
                );

            elementsToChange.forEach((elem: FormElementType): void => {
                elem.className = newInputStyle;
            });

            const errorMsg: FormElementType = document.querySelector(
                '.phone-block__error-message'
            ) as FormElementType;
            error ?
                errorMsg.classList.remove('phone-block__error-message_hide') :
                errorMsg.classList.add('phone-block__error-message_hide');

            this.state.error = error;
        }
    }

    public createForm(): HTMLDivElement {
        const container: HTMLDivElement = document.createElement('div');
        const phoneBlock: HTMLDivElement = document.createElement('div');
        phoneBlock.className = 'phone-block';

        const arrayOfFormElementsProps: FormElementsProps[] =
                                            this.parseMask(this.mask);
        arrayOfFormElementsProps.forEach((props: FormElementsProps): void => {
            if (props.element === 'input') {
                const input: FormElementType =
                    InputElement.createElement(props);
                phoneBlock.appendChild(input);
            } else {
                const span: FormElementType = SpanElement.createElement(props);
                phoneBlock.appendChild(span);
            }
        });

        const errorMsg: HTMLDivElement = document.createElement('div');
        errorMsg.className = 'phone-block';

        const errorMsgSpan: HTMLSpanElement = document.createElement('span');
        errorMsgSpan.classList.add('phone-block__error-message');
        errorMsgSpan.classList.add('phone-block__error-message_hide');
        errorMsgSpan.innerText = 'Неверный номер, попробуйте еще раз';
        errorMsg.appendChild(errorMsgSpan);

        container.appendChild(phoneBlock);
        container.appendChild(errorMsg);
        return container;
    }
};
