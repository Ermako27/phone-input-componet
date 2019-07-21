import {FormElementsProps} from '../interfaces/IFormElement';
import {MaskLegend} from '../interfaces/IForm';

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

/**
 * @param {string} mask шаблон для компонента
 * @return {FormElementsProps[]} массив из пропсов для каждого из элементов
 * компонента ввода телефона
 */
export default function parseMask(mask: string): FormElementsProps[] {
    const result: FormElementsProps[] = Array.from(mask).reduce(
        (acc: FormElementsProps[], elem: string): FormElementsProps[] => {
            if (elem in maskLegend) {
                const props: FormElementsProps = {...maskLegend[elem]};
                acc.push(props);
                return acc;
            } else if (/[0-9]/.test(elem)) {
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
};
