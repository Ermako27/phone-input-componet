import PhoneForm from '../src/components/form';
import fs from 'fs';

describe('phone form creation', (): void => {
    it('snapshot test for creation phone form', (): void => {
        let spanShot;
        const phoneForm = new PhoneForm('+7(985)0II-**-**');
        const phoneFormHtmlElement = phoneForm.createForm();
        try {
            spanShot = fs.readFileSync(
                `${__dirname}/__snapshots__/createForm.test.snapshot`
            ).toString();
        } catch {
            spanShot = phoneFormHtmlElement.outerHTML;
            try {
                fs.mkdirSync(`${__dirname}/__snapshots__`);
                fs.writeFileSync(
                    `${__dirname}/__snapshots__/createForm.test.snapshot`,
                    spanShot
                );
            } catch {
                fs.writeFileSync(
                    `${__dirname}/__snapshots__/createForm.test.snapshot`,
                    spanShot
                );
            }
        }
        expect(phoneFormHtmlElement.outerHTML).toEqual(spanShot);
    });
});
