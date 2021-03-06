import {PhoneComponentElementsProps} from '../interfaces/IComponentElement';
import {MaskLegend} from '../interfaces/IComponent';

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
 * @return {string} маска с удаленными пробелами
 */
function removeSpaces(mask: string): string {
    return Array.from(mask).reduce((acc: string, elem: string): string => {
        acc += elem !== ' ' ? elem : '';
        return acc;
    }, '');
}

/**
 * @param {string} mask шаблон для компонента
 * @return {boolean} является ли маска пустой
 */
function isEmpty(mask: string): boolean {
    return mask === '';
}

/**
 * @param {string} mask шаблон для компонента
 * @param {boolean} error если пользователь захочет нарисовать компонент сразу
 * в состоянии ошибки
 * @return {PhoneComponentElementsProps[]} массив из пропсов для каждого
 * из элементов компонента ввода телефона
 */
export default function parseMask(
    mask: string,
    error: boolean = false,
): PhoneComponentElementsProps[] {
    const maskWithoutSpaces = removeSpaces(mask);
    if (isEmpty(maskWithoutSpaces)) {
        throw new Error('Your mask is empty');
    }

    /**
    * если пользователь захочет нарисовать компонент сразу
    * в состоянии ошибки то меняем пропсы для активных инпутов
    */
    maskLegend['I'].style = error ?
        'phone-block__input_error' :
        'phone-block__input_normal';
    maskLegend['I'].state = error ? 'error' : 'normal';

    const result: PhoneComponentElementsProps[] =
        Array.from(maskWithoutSpaces).reduce(
            (acc: PhoneComponentElementsProps[], elem: string):
            PhoneComponentElementsProps[] => {
                if (elem in maskLegend) {
                    const props: PhoneComponentElementsProps =
                        {...maskLegend[elem]};
                    acc.push(props);
                    return acc;
                } else if (/[0-9]/.test(elem)) {
                    const props: PhoneComponentElementsProps = {
                        value: elem,
                        style: 'phone-block__input_disabled',
                        state: 'disabled',
                        element: 'input',
                    };
                    acc.push(props);
                    return acc;
                } else {
                    const props: PhoneComponentElementsProps = {
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
