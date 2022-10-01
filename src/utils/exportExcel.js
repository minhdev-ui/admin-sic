import * as xlsx from 'xlsx';
// const path = require('path');

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, filePath);
}

const exportUsersToExcel = (users, workSheetColumnNames, workSheetName, filePath) => {
    const data = users.map(user => {
        return [user.masv, user.fullName, user.date, user.gender, user.class, user.email, user.phone, user.answer.join(', '), user.message, user.facebook];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

export default exportUsersToExcel
