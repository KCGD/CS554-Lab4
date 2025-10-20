
export function date_passed(date:string): boolean {
    let d = new Date(date);
    if(Number.isNaN(d.getDay())) {
        throw new Error(`Invalid date.`);
    }

    return (d.valueOf() - new Date().valueOf()) < 0;
}