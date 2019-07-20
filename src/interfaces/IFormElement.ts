export interface FormElementsProps {
    value: string; // значение
    style: string; // css класс
    element: string; // span или input
    state?: string; // состояние input
};

/**
 * Интерфейс для класса инпута
 */
export interface FormElementClass {
    createElement (props: FormElementsProps): FormElementType;
};

export type FormElementType = HTMLDivElement | HTMLSpanElement;
