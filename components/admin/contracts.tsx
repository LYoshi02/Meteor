import { useRef, useEffect } from "react";
import { Box, Heading, ToastId, useToast } from "@chakra-ui/react";
import useSWR from "swr";

import Alert from "../ui/alert";
import ContractsTable from "./contracts/table";
import LoadingSpinner from "../ui/loading-spinner";
import { ContractSchema } from "../../types";
import useHttp from "../../hooks/useHttp";
import { DEFAULT_ERROR_TOAST_PROPS } from "../../utils/constants";

const Contracts = () => {
  const { data, error, mutate } = useSWR<{
    contracts: ContractSchema[];
    contractsCount: number;
  }>("/api/admin/contracts");
  const { sendRequest, error: reqError } = useHttp();
  const toast = useToast();
  const toastRef = useRef<ToastId | undefined | null>(null);

  useEffect(() => {
    if (reqError) {
      toastRef.current = toast({
        ...DEFAULT_ERROR_TOAST_PROPS,
        description:
          reqError.message ||
          "Se produjo un error al actualizar el estado de la factura",
      });
    }

    return () => {
      if (toastRef.current) {
        toast.close(toastRef.current);
      }
    };
  }, [reqError, toast]);

  const changeContractStatus = async (contractNumber: number) => {
    await sendRequest<{ message: string; contract: ContractSchema }>(
      {
        input: `/api/admin/contracts/${contractNumber}`,
        init: {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFinished: true }),
        },
      },
      (res) => updateContract(res.contract)
    );
  };

  const updateContract = (contract: ContractSchema) => {
    mutate((currentData) => {
      let updatedContracts = [...currentData!.contracts];
      const updatedContractIndex = updatedContracts.findIndex(
        (c) => c.NroContrato === contract.NroContrato
      );

      updatedContracts[updatedContractIndex] = contract;

      return {
        contracts: updatedContracts,
        contractsCount: currentData!.contractsCount,
      };
    });
  };

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <ContractsTable
        contracts={data.contracts}
        contractsCount={data.contractsCount}
        onChangeStatus={changeContractStatus}
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
  console.log(data);

  return (
    <Box>
      <Heading as="h2">Contratos</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Contracts;
