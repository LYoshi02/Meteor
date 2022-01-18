import { Alert, Box, Heading, ToastId, useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import useSWR from "swr";

import { InvoiceSchema } from "../../types";
import LoadingSpinner from "../ui/loading-spinner";
import useHttp from "../../hooks/useHttp";
import InvoicesTable from "./invoices/table";

const Invoices = () => {
  const { data, error, mutate } = useSWR<{
    invoices: InvoiceSchema[];
    invoicesCount: number;
  }>("/api/admin/invoices");
  const { sendRequest, error: reqError } = useHttp();
  const toast = useToast();
  const toastRef = useRef<ToastId | undefined | null>(null);

  useEffect(() => {
    if (reqError) {
      toastRef.current = toast({
        title: "Error!",
        description:
          "Se produjo un error al actualizar el estado de la factura",
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
    }

    return () => {
      if (toastRef.current) {
        toast.close(toastRef.current);
      }
    };
  }, [reqError, toast]);

  const changeInvoiceStatus = async (
    isPaid: boolean,
    invoiceNumber: number
  ) => {
    await sendRequest<{ message: string; invoice: InvoiceSchema }>(
      {
        input: `/api/admin/invoices/${invoiceNumber}`,
        init: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPaid }),
        },
      },
      (res) => updateInvoice(res.invoice)
    );
  };

  const updateInvoice = (invoice: InvoiceSchema) => {
    mutate((currentData) => {
      let updatedInvoices = [...currentData!.invoices];
      const updatedInvoiceIndex = updatedInvoices.findIndex(
        (i) => i.NroFactura === invoice.NroFactura
      );

      updatedInvoices[updatedInvoiceIndex] = invoice;

      return {
        invoices: updatedInvoices,
        invoicesCount: currentData!.invoicesCount,
      };
    });
  };

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <InvoicesTable
        invoices={data.invoices}
        invoicesCount={data.invoicesCount}
        onChangeStatus={changeInvoiceStatus}
      />
    );
  } else if (error) {
    mainContent = (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  } else {
    mainContent = <LoadingSpinner />;
  }

  return (
    <Box>
      <Heading as="h2">Facturas</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Invoices;
