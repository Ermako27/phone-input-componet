import fs from 'fs';

/**
 * @param {string} expected то что сравниваиется со снепшотом
 * @param {string} name имя файла
 */
export default function checkSnapShot(expected: string, name?: string): void {
    let spanShot: string;
    try {
        spanShot = fs.readFileSync(
            `${__dirname}/__snapshots__/${name}.test.snapshot`
        ).toString();
    } catch {
        spanShot = expected;
        try {
            fs.mkdirSync(`${__dirname}/__snapshots__`);
            fs.writeFileSync(
                `${__dirname}/__snapshots__/${name}.test.snapshot`,
                spanShot
            );
        } catch {
            fs.writeFileSync(
                `${__dirname}/__snapshots__/${name}.test.snapshot`,
                spanShot
            );
        }
    }
    expect(expected).toEqual(spanShot);
};
