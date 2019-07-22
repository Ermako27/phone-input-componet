import {
    PhoneComponentElementsProps,
    ComponentElementClass,
} from '../interfaces/IComponentElement';

class SpanElement implements ComponentElementClass {
    public createElement(props: PhoneComponentElementsProps): HTMLSpanElement {
        const span: HTMLSpanElement = document.createElement('span');
        span.className = props.style;
        span.innerText = props.value;
        return span;
    }
};

export default new SpanElement;
