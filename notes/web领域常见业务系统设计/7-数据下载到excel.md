# xlsx

- xlsx

```

// 创建工作表

const worksheet = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });

const workbook = XLSX.utils.book_new();

 const finalWorksheet = XLSX.utils.aoa_to_sheet(allData);

// 设置单元格合并

finalWorksheet['!merges']

// 设置行高

finalWorksheet['!rows']

// 设置列宽

finalWorksheet['!cols']

// 添加到工作簿

XLSX.utils.book_append_sheet(workbook, finalWorksheet, '报告');

// 生成文件名和保存文件

const fileName = `record-${new Date().getTime()}.xlsx`;
const filePath = path.join(saveDirectory, fileName);
XLSX.writeFile(workbook, filePath);

```
