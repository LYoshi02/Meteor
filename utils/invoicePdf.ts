import PDFDocument from "pdfkit";
import fs from "fs";

const page = { height: 841, width: 595 };
const margin = 20;
const pageWidthWithoutMargins = page.width - margin * 2;

const invoicedServices = [
  { name: "Nombre del Servicio", precio: 100 },
  { name: "Nombre del Servicio", precio: 100 },
  { name: "Nombre del Servicio", precio: 100 },
  { name: "Nombre del Servicio", precio: 100 },
  { name: "Nombre del Servicio", precio: 100 },
];

export const generateInvoice = (pdfTitle: string) => {
  const invoice = new PDFDocument({
    size: "A4",
    margin: margin,
    info: {
      Title: pdfTitle,
    },
  });

  invoice.pipe(fs.createWriteStream("invoice.pdf"));

  invoice.fontSize(20).font("Helvetica-Bold").text("Factura N°10000");
  invoice.moveDown();
  invoice.fontSize(14).font("Helvetica-Bold").text("Cliente");

  const clientStartPosY = invoice.y;
  const clientWidth = pageWidthWithoutMargins * 0.5;
  invoice
    .fontSize(12)
    .font("Helvetica")
    .lineGap(3)
    .text("Nombre: Yoshi Debat", { width: clientWidth });
  invoice.text("Dni: 44278506", { width: clientWidth });
  invoice.text("Dirección: la direccion del cliente", {
    width: clientWidth,
  });
  invoice.text("Teléfono: 3756411252", {
    width: clientWidth,
  });

  const datesGutter = 18;
  const datesWidth = pageWidthWithoutMargins * 0.4;
  invoice.text(
    "Período de Inicio: 01/12/2022",
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY,
    {
      width: datesWidth,
    }
  );
  invoice.text(
    "Vencimiento: 10/01/2022",
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY + datesGutter,
    {
      width: datesWidth,
    }
  );
  invoice.text(
    "Período de Fin: 30/01/2022",
    pageWidthWithoutMargins - datesWidth,
    clientStartPosY + datesGutter * 2,
    {
      width: datesWidth,
    }
  );

  invoice.moveDown(5);

  const tableStartPosY = invoice.y;
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
  invoice
    .font("Helvetica-Bold")
    .text("Cantidad", tableColumnsPosX.quantity, tableStartPosY, {
      width: tableColumnsWidth.quantity,
      align: "center",
    });
  invoice
    .font("Helvetica-Bold")
    .text("Descripción", tableColumnsPosX.description, tableStartPosY, {
      width: tableColumnsWidth.description,
      align: "center",
    });
  invoice
    .font("Helvetica-Bold")
    .text("Precio Unitario", tableColumnsPosX.unitPrice, tableStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });
  invoice
    .font("Helvetica-Bold")
    .text("Precio Total", tableColumnsPosX.totalPrice, tableStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });

  invoice.moveDown(2);

  const invoicedServiceHeight = 25;
  invoicedServices.map((service, index) => {
    const posY = tableStartPosY + (index + 1) * invoicedServiceHeight;
    const unitPrice = service.precio.toFixed(2).toString();

    if (index % 2 === 0) {
      invoice
        .rect(margin, posY - 8, pageWidthWithoutMargins, invoicedServiceHeight)
        .fillAndStroke("#ddd");
      invoice.fill("black").stroke();
    }

    invoice.font("Helvetica").text("1", tableColumnsPosX.quantity, posY, {
      width: tableColumnsWidth.quantity,
      align: "center",
      lineBreak: false,
    });
    invoice
      .font("Helvetica")
      .text(service.name, tableColumnsPosX.description, posY, {
        width: tableColumnsWidth.description,
        align: "center",
        lineBreak: false,
      });
    invoice
      .font("Helvetica")
      .text(unitPrice, tableColumnsPosX.unitPrice, posY, {
        width: tableColumnsWidth.price,
        align: "center",
        lineBreak: false,
      });
    invoice
      .font("Helvetica")
      .text(unitPrice, tableColumnsPosX.totalPrice, posY, {
        width: tableColumnsWidth.price,
        align: "center",
        lineBreak: false,
      });
  });

  invoice.moveDown(1);

  const pricesStartPosY = invoice.y;
  const pricesGutter = 25;
  invoice
    .font("Helvetica-Bold")
    .text("Subtotal", tableColumnsPosX.unitPrice, pricesStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });
  invoice
    .font("Helvetica")
    .text("500.00", tableColumnsPosX.totalPrice, pricesStartPosY, {
      width: tableColumnsWidth.price,
      align: "center",
    });

  invoice
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
  invoice
    .font("Helvetica")
    .text(
      "100.00",
      tableColumnsPosX.totalPrice,
      pricesStartPosY + pricesGutter,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );

  invoice
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
  invoice
    .font("Helvetica")
    .text(
      "400.00",
      tableColumnsPosX.totalPrice,
      pricesStartPosY + pricesGutter * 2,
      {
        width: tableColumnsWidth.price,
        align: "center",
      }
    );

  return invoice;
};
