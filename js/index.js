class InputElement {
    createElement(props) {
        const div = document.createElement('div');
        div.className = 'phone-block__input';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = props.style;
        if (props.state == 'disabled') {
            input.disabled = true;
            input.value = props.value;
        }
        else {
            input.placeholder = '_';
            input.maxLength = 1;
        }
        div.appendChild(input);
        return div;
    }
}
var InputElement$1 = new InputElement;

class SpanElement {
    createElement(props) {
        const span = document.createElement('span');
        span.className = props.style;
        span.innerText = props.value;
        return span;
    }
}
var SpanElement$1 = new SpanElement;

const maskLegend = {
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
function removeSpaces(mask) {
    return Array.from(mask).reduce((acc, elem) => {
        acc += elem !== ' ' ? elem : '';
        return acc;
    }, '');
}
function isEmpty(mask) {
    return mask === '';
}
function parseMask(mask, error = false) {
    const maskWithoutSpaces = removeSpaces(mask);
    if (isEmpty(maskWithoutSpaces)) {
        throw new Error('Your mask is empty');
    }
    maskLegend['I'].style = error ?
        'phone-block__input_error' :
        'phone-block__input_normal';
    maskLegend['I'].state = error ? 'error' : 'normal';
    const result = Array.from(maskWithoutSpaces).reduce((acc, elem) => {
        if (elem in maskLegend) {
            const props = Object.assign({}, maskLegend[elem]);
            acc.push(props);
            return acc;
        }
        else if (/[0-9]/.test(elem)) {
            const props = {
                value: elem,
                style: 'phone-block__input_disabled',
                state: 'disabled',
                element: 'input',
            };
            acc.push(props);
            return acc;
        }
        else {
            const props = {
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

class PhoneComponent {
    constructor(mask, state = { error: false }) {
        this.mask = mask;
        this.state = state;
    }
    setState({ error = false }) {
        if (error !== this.state.error) {
            const newInputStyle = error ?
                'phone-block__input_error' :
                'phone-block__input_normal';
            const prevInputStyle = error ?
                'phone-block__input_normal' :
                'phone-block__input_error';
            const elementsToChange = document
                .querySelectorAll(`.phone-block__input > .${prevInputStyle}`);
            elementsToChange.forEach((elem) => {
                elem.className = newInputStyle;
            });
            const errorMsg = document.querySelector('.phone-block__error-message');
            error ?
                errorMsg.classList.remove('phone-block__error-message_hide') :
                errorMsg.classList.add('phone-block__error-message_hide');
            this.state.error = error;
        }
    }
    getComponentValue() {
        const result = {
            maskNumber: '',
            rawNumber: '',
        };
        let inputPointer = 0;
        const inputStyle = this.state.error ?
            'phone-block__input_error' :
            'phone-block__input_normal';
        const elementsToHarvest = document
            .querySelectorAll(`.phone-block__input > .${inputStyle}`);
        for (const elem of this.mask) {
            if (elem === 'I') {
                result.maskNumber +=
                    elementsToHarvest[inputPointer].value.length ?
                        elementsToHarvest[inputPointer].value :
                        'I';
                result.rawNumber += elementsToHarvest[inputPointer].value;
                inputPointer += 1;
            }
            else {
                result.maskNumber += elem;
            }
        }
        return result;
    }
    createComponent() {
        const container = document.createElement('div');
        const phoneBlock = document.createElement('div');
        phoneBlock.className = 'phone-block';
        const arrayOfElementsProps = parseMask(this.mask, this.state.error);
        arrayOfElementsProps.forEach((props) => {
            if (props.element === 'input') {
                const input = InputElement$1.createElement(props);
                phoneBlock.appendChild(input);
            }
            else {
                const span = SpanElement$1.createElement(props);
                phoneBlock.appendChild(span);
            }
        });
        const errorMsg = document.createElement('div');
        errorMsg.className = 'phone-block';
        const errorMsgSpan = document.createElement('span');
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
}

let toggler = true;
const mask = '+7(985)0II-**-**';

const phoneComponent = new PhoneComponent(mask);
const form = document.createElement('form');

const submitButtonDiv = document.createElement('div');
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.innerText = 'Отправить';
submitButtonDiv.appendChild(submitButton);

form.appendChild(phoneComponent.createComponent());
form.appendChild(submitButtonDiv);

form.onsubmit = event => {
    event.preventDefault();
    phoneComponent.setState({error: toggler});
    console.log(phoneComponent.getComponentValue());
    toggler = !toggler;
};

const root = document.getElementById('root');
root.appendChild(form);
