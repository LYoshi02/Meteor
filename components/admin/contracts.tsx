import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";

import Alert from "../ui/alert";
import ContractsTable from "./contracts/table";
import LoadingSpinner from "../ui/loading-spinner";
import { ContractSchema } from "../../types";
import useHttp from "../../hooks/useHttp";
import useToastOnReq from "../../hooks/useToastOnReq";

const Contracts = () => {
  const { data, error, mutate } = useSWR<{
    contracts: ContractSchema[];
    contractsCount: number;
  }>("/api/admin/contracts");
  const { sendRequest, error: reqError, success: reqSuccess } = useHttp();

  useToastOnReq({
    success: {
      showToast: reqSuccess,
      message: "Contrato actualizado correctamente",
    },
    error: {
      showToast: reqError !== null,
      message: reqError?.message,
    },
  });

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
