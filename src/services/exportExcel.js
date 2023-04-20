import saveAsExcelFile from './saveAsExcelFile';

const exportExcel = (data) => {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'products');
    });
};

export default exportExcel;