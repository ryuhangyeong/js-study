// @flow
export default (dan: number): string => {
    let i;
    let str = '';

    if (dan < 2 || dan > 9) return str;

    for (i = 1; i < 10; i += 1) {
        str += `
            <li class="list-group-item">
                <span class="danTxt">${dan}</span> * 
                <span class="idxTxt">${i}</span> = 
                <span class="resultTxt">${dan * i}</span>
            </li>
        `;
    }

    return str;
};
