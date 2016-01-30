
// 生成表格主体内容
function generateTableHead(headArray = []) {
    const $thead = $('<thead></thead>');
    const $tr = $('<tr></tr>');
    headArray.forEach((cell, col) => $tr.append(`<th>${cell.text}</th>`));
    $thead.html($tr);
    return $thead;
}

// 生成表格主体内容
function generateTableBody(bodyArray = []) {
    const $tbody = $('<tbody></tbody>');
    bodyArray.forEach((rowArray, row) => {
        const $tr = $('<tr></tr>');
        rowArray.forEach((cell, col) => $tr.append(`<td>${cell.text}</td>`));
        $tbody.append($tr);
    });
    return $tbody;
}


// 表格构造函数
export class Table {
    constructor(options = {}, configs = {}) {
        this.$el = $('<div class="simple-grid"></div>').attr('data-type', this.type);
        this.el = this.$el[0];

        this.$el.html(
            $('<table></table>')
                .append(generateTableHead(options.head))
                .append(generateTableBody(options.body))
        );
    }
}

Table.prototype.type = 'Table';
