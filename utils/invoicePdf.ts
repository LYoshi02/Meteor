import PDFDocument from "pdfkit";
import fs from "fs";
import { format } from "date-fns";

import { ClientSchema, InvoiceDetailSchema, InvoiceSchema } from "../types";

const page = { height: 841, width: 595 };
const margin = 20;
const pageWidthWithoutMargins = page.width - margin * 2;

const dateFormat = "dd/MM/yyyy";

export const generateInvoice = (
  invoice: InvoiceSchema,
  details: InvoiceDetailSchema[],
  user: ClientSchema
) => {
  const invoiceDoc = new PDFDocument({
    size: "A4",
    margin: margin,
    info: {
      Title: `Factura ${invoice.NroFactura}`,
    },
  });

  invoiceDoc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(`Factura N°${invoice.NroFactura}`);
  invoiceDoc.moveDown();
  invoiceDoc.fontSize(14).font("Helvetica-Bold").text("Cliente");

  const clientStartPosY = invoiceDoc.y;
  const clientWidth = pageWidthWithoutMargins * 0.5;
  invoiceDoc
    .fontSize(12)
    .font("Helvetica")
    .lineGap(3)
    .text(`Nombre: ${user.Apellido} ${user.Nombre}`, { width: clientWidth });
  invoiceDoc.text(`Dni: ${user.Dni}`, { width: clientWidth });
  invoiceDoc.text(`Dirección: ${user.Direccion}`, {
    width: clientWidth,
  });
  invoiceDoc.text(`Teléfono: ${user.Telefono}`, {
    width: clientWidth,
  });

  const datesGutter = 18;
  const datesWidth = pageWidthWithoutMargins * 0.4;
  invoiceDoc.text(
    `Período de Inicio: ${format(new Date(invoice.PeriodoInicio), dateFormat)}`,
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY,
    {
      width: datesWidth,
    }
  );
  invoiceDoc.text(
    `Vencimiento: ${format(new Date(invoice.Vencimiento), dateFormat)}`,
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY + datesGutter,
    {
      width: datesWidth,
    }
  );
  invoiceDoc.text(
    `Período de Fin: ${format(new Date(invoice.PeriodoFin), dateFormat)}`,
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY + datesGutter * 2,
    {
      width: datesWidth,
    }
  );

  invoiceDoc.moveDown(5);

  const tableStartPosY = invoiceDoc.y;
  const tableColumnsWidth = {
    quantity: pageWidthWithoutMargins * 0.15,
    description: pageWidthWithoutMargins * 0.45,
    price: pageWidthWithoutMargins * 0.2,
  };
  const tableColumnsPosX = {
    quantity: margin,
    description: margin + tableColumnsWidth.quantity,
    unitPrice:
      margin + tableColumnsWidth.quantity + tableColumnsWidth.description,
    totalPrice:
      margin +
      tableColumnsWidth.quantity +
      tableColumnsWidth.description +
      tableColumnsWidth.price,
  };
  invoiceDoc
    .font("Helvetica-Bold")
    .text("Cantidad", tableColumnsPosX.quantity, tableStartPosY, {
      width: tableColumnsWidth.quantity,
      align: "center",
    });
  invoiceDoc
    .font("Helvetica-Bold")
    .text("Descripción", tableColumnsPosX.description, tableStartPosY, {
      width: tableColumnsWidth.description,
      align: "center",
    });
  invoiceDoc
    .font("Helvetica-Bold")
    .text("Precio Unitario", tableColumnsPosX.unitPrice, tableStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });
  invoiceDoc
    .font("Helvetica-Bold")
    .text("Precio Total", tableColumnsPosX.totalPrice, tableStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });

  invoiceDoc.moveDown(2);

  const invoicedServiceHeight = 25;
  const serviceDetails: any[] = [],
    discountDetails: any[] = [];
  let subtotal = 0,
    discount = 0;

  details.forEach((d: any) => {
    if (d.EsDescuento) {
      discountDetails.push(d);
      discount += +d.TotalParcial * d.Cantidad;
    } else {
      serviceDetails.push(d);
      subtotal += +d.TotalParcial * d.Cantidad;
    }
  });

  serviceDetails.map((detail: any, index: number) => {
    const posY = tableStartPosY + (index + 1) * invoicedServiceHeight;
    const unitPrice = +detail.TotalParcial;
    const totalPrice = unitPrice * detail.Cantidad;

    if (index % 2 === 0) {
      invoiceDoc
        .rect(margin, posY - 8, pageWidthWithoutMargins, invoicedServiceHeight)
        .fillAndStroke("#ddd");
      invoiceDoc.fill("black").stroke();
    }

    invoiceDoc
      .font("Helvetica")
      .text(detail.Cantidad, tableColumnsPosX.quantity, posY, {
        width: tableColumnsWidth.quantity,
        align: "center",
        lineBreak: false,
      });
    invoiceDoc
      .font("Helvetica")
      .text(detail.Descripcion, tableColumnsPosX.description, posY, {
        width: tableColumnsWidth.description,
        align: "center",
        lineBreak: false,
      });
    invoiceDoc
      .font("Helvetica")
      .text(unitPrice.toString(), tableColumnsPosX.unitPrice, posY, {
        width: tableColumnsWidth.price,
        align: "center",
        lineBreak: false,
      });
    invoiceDoc
      .font("Helvetica")
      .text(totalPrice.toString(), tableColumnsPosX.totalPrice, posY, {
        width: tableColumnsWidth.price,
        align: "center",
        lineBreak: false,
      });
  });

  invoiceDoc.moveDown(1);

  const pricesStartPosY = invoiceDoc.y;
  const pricesGutter = 25;
  invoiceDoc
    .font("Helvetica-Bold")
    .text("Subtotal", tableColumnsPosX.unitPrice, pricesStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });
  invoiceDoc
    .font("Helvetica")
    .text(
      subtotal.toFixed(2).toString(),
      tableColumnsPosX.totalPrice,
      pricesStartPosY,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );

  invoiceDoc
    .font("Helvetica-Bold")
    .text(
      "Descuento",
      tableColumnsPosX.unitPrice,
      pricesStartPosY + pricesGutter,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );
  invoiceDoc
    .font("Helvetica")
    .text(
      discount.toFixed(2).toString(),
      tableColumnsPosX.totalPrice,
      pricesStartPosY + pricesGutter,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );

  invoiceDoc
    .font("Helvetica-Bold")
    .text(
      "Total",
      tableColumnsPosX.unitPrice,
      pricesStartPosY + pricesGutter * 2,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );
  invoiceDoc
    .font("Helvetica")
    .text(
      (subtotal - discount).toFixed(2).toString(),
      tableColumnsPosX.totalPrice,
      pricesStartPosY + pricesGutter * 2,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );

  return invoiceDoc;
};
