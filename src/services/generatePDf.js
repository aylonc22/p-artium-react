import jsPDF from 'jspdf';
import { Observable, of } from 'rxjs';
import DavidFont from '../assets/fonts/david/david-normal';

const rtl = (str) => {
    return str.split('').reverse().join('');
  }

  const priceFormat =(price) =>{
    let str = '';
    if (price >= 1000) {
      str += Math.floor(price / 1000) + ',';
      price %= 1000;
      if (Math.floor(price / 100) == 0) {
        str += 0;
      }
    }
    str += price.toFixed(2);
    return str;
  }


const download =(account)=> {
    generatePDF(account).subscribe((pdfFile) => {
      pdfFile.save(`account_${account.id}.pdf`);
    });
  }

   const generatePDF = (account)=> {
    const doc = new jsPDF();
    //#region set to hebrew font
    doc.addFileToVFS('david.ttf', DavidFont);
    doc.addFont('david.ttf', 'david', 'normal');
    doc.setFont('david');
    //#endregion set to hebrew font
    //#region declareation
    let text = ''; //temp text to put in the doc
    let x, y; //current place in the doc
    const VAT = 17;
    let vatValue = account.account * (VAT / 100);
    let finalPrice = account.account + vatValue;
    //#endregion declareation
    //#region page header
    //#region logo
    doc.setFontSize(40);
    y = 18;
    x = 160;
    doc.text(account.factory.logo, x, y);
    //#endregion logo
    //#region address
    doc.setFontSize(18);
    //#region line 1
    y += 12;
    text = rtl(account.factory.desc);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 1
    //#region line 2
    y += 7;
    text = rtl(account.factory.address.location);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 2
    //#region line 3
    y += 7;
    text = rtl('רחוב ');
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.address.street);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.address.number;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 3
    //#region line 4
    y += 7;
    text = rtl(account.factory.address.city);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.address.code;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 4
    //#endregion address
    //#region details
    //#region  head line
    y = 15;
    text = account.factory.code;
    x = 15;
    doc.text(text, x, y);
    x += doc.getTextWidth(text);
    text = rtl('מדווח לצרכי מע"מ בשותפות מספר ');
    doc.text(text, x, y);
    //#endregion  head line
    //#region line 1
    y = 33;
    text = account.factory.tel;
    x = 80 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('טלפון');
    x = 87;
    doc.text(text, x, y);
    //#endregion line 1
    //#region line 2
    y += 6;
    text = account.factory.fax;
    x = 80 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('פקסמיליה');
    x = 87;
    doc.text(text, x, y);
    //#endregion line 2
    //#region line 3
    y += 6;
    text = account.factory.internet;
    x = 80 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('אינטרנט');
    x = 87;
    doc.text(text, x, y);
    //#endregion line 3
    //#endregion details
    //#region bottom line
    doc.line(20, 55, 200, 55);
    //#endregion bottom line
    //#endregion page header
    //#region page body
    //#region title
    doc.setFontSize(23);
    //#region line 1
    y = 68;
    text = rtl('חשבון מספר ');
    let middle=115+(doc.getTextWidth(text)+doc.getTextWidth(account.id.toString()))/2
    x = middle - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.id.toString();
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 1
    //#region line 2
    y += 11;
    text = rtl(account.type);
    x = 125 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 2
    //#endregion title
    //#region customer details
    doc.setFontSize(16);
    //#region line 1
    y += 10;
    text = rtl('לכבוד');
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('תאריך:');
    x = 70;
    doc.text(text, x, y);
    const dateParts = account.startDate.split('/')
    let date=new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
    text = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
    x = 40;
    doc.text(text, x, y);
    //#endregion line 1
    //#region line 2
    y += 9;
    text = rtl(account.name);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 2
    //#region line 3
    y += 7;
    text = rtl(account.address.street);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.address.number;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 3
    //#region line 4
    y += 7;
    text = rtl(account.address.city);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.address.code;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 4
    //#endregion customer details
    //#region account details
    //#region line 1
    y += 10;
    text = rtl('להלן חשבון שכר טרחתתנו עבור:');
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('שקל חדש');
    x = 55 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 1
    //#region bottom line
    y += 3;
    doc.line(20, y, 200, y);
    //#endregion bottom line
    //#region line 2
    y += 7;
    text = rtl(account.heDesc);
    x = 200 - doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.enDesc;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = priceFormat(account.account);
    x = 55 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 2
    //#region bottom line
    y += 3;
    doc.line(20, y, 200, y);
    //#endregion bottom line
    //#region line 3
    y += 9;
    text = rtl('סה"כ:');
    x = 62;
    doc.text(text, x, y);
    text = priceFormat(account.account);
    x = 55 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 3
    //#region line 4
    y += 7;
    text = ':';
    x = 62;
    doc.text(text, x, y);
    x += doc.getTextWidth(text);
    text = VAT.toString();
    doc.text(text, x, y);
    x += doc.getTextWidth(text);
    text = rtl('מע"מ %');
    doc.text(text, x, y);
    text = priceFormat(vatValue);
    x = 55 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 4
    //#region line 5
    y += 7;
    text = rtl('סה"כ לתשלום:');
    x = 62;
    doc.text(text, x, y);
    text = priceFormat(finalPrice);
    x = 55 - doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 5
    //#region bottom line
    y += 5;
    doc.line(20, y, 200, y);
    //#endregion bottom line
    //#endregion account details
    //#endregion page body
    //#region page footer
    doc.setFontSize(14);
    y = 200;
    x = 200;
    //#region top
    //#region line 1
    text = 'חשבון זה אינו מהווה חשבונית מס.';
    x = 200 - doc.getTextWidth(text);
    doc.text(rtl(text), x, y);
    //#endregion line 1
    //#region line 2
    text = 'חשבונית מס תוצא עם גבייתו.';
    y += 7;
    x = 200 - doc.getTextWidth(text);
    doc.text(rtl(text), x, y);
    //#endregion line 2
    //#endregion top
    //#region bank details
    y += 12;
    x = 200;
    //#region line 1
    text = rtl('ניתן לשלם בהעברה בנקאית בש"ח ובמט"ח לבנק ');
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.bank.name);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ') ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.bank.id;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ,(';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl('סניף ');
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.bank.branch.name);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.bank.branch.id);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 1
    y += 7;
    x = 200;
    //#region line 2
    text = rtl('מספר חשבון ');
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.bank.account;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ) ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.bank.swift;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = '(SWIFT:';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 2
    y += 7;
    x = 200;
    //#region line 3
    text = rtl('כתובת הבנק ');
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.bank.address.street);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.bank.address.number;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = ' ,';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = rtl(account.factory.bank.address.city);
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 3
    y += 7;
    x = 200;
    //#region line 4
    text = account.factory.bank.iban;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = 'IBAN:IL ';
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 4
    y += 7;
    x = 200;
    //#region line 5
    text = rtl('שותפות רשומה מספר ');
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    text = account.factory.code;
    x -= doc.getTextWidth(text);
    doc.text(text, x, y);
    //#endregion line 5
    //#endregion bank details
    //#region bottom
    y += 12;
    text = 'בעת ביצוע ההעברה, יש לציין את מס החשבון בגינו מועבר התקבול.';
    x = 200 - doc.getTextWidth(text);
    doc.text(rtl(text), x, y);
    //#endregion bottom
    //#endregion page footer
    return of(doc);
   }


   export default download;