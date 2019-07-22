import {
    PhoneComponentElementsProps,
} from './IComponentElement';

export interface MaskLegend {
    I: PhoneComponentElementsProps;
    X: PhoneComponentElementsProps;
    '*': PhoneComponentElementsProps;
    [propName: string]: PhoneComponentElementsProps;
}

/**
 * Состояние компонента
 */
export interface PhoneComponentState {
    error: boolean;
}

export interface ComponentValue {
    maskNumber: string; // В маске I заменяются на введенные числа
    rawNumber: string; // Строка введеных символов без пробелов '5535'
}

/**
 * Интерфейс для класса формы
 */
export interface PhoneComponentClass {
    createComponent(): HTMLDivElement;
    setState({error}: {error?: boolean}): void;
    getComponentValue(): ComponentValue;
};
