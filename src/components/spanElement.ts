import {
    FormElementsProps,
    FormElementClass,
} from '../interfaces/IFormElement';

class SpanElement implements FormElementClass {
    public createElement(props: FormElementsProps): HTMLSpanElement {
        const span: HTMLSpanElement = document.createElement('span');
        span.className = props.style;
        span.innerText = props.value;
        return span;
    }
};

export default new SpanElement;
