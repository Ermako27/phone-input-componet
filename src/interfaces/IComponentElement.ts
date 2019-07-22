export interface PhoneComponentElementsProps {
    value: string; // значение
    style: string; // css класс
    element: string; // span или input
    state?: string; // состояние input
};

/**
 * Интерфейс для класса инпута
 */
export interface ComponentElementClass {
    createElement (props: PhoneComponentElementsProps): ComponentElementType;
};

export type ComponentElementType = HTMLDivElement | HTMLSpanElement;
