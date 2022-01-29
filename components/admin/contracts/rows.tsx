import { Switch, Td, Tr } from "@chakra-ui/react";

import { ContractSchema } from "../../../types";
import { formateDateToFullDate } from "../../../utils/dateHelpers";

type Props = {
  contracts: ContractSchema[];
  onChange: (contractNumber: number) => void;
};

const ContractsTableRows = (props: Props) => {
  return (
    <>
      {props.contracts.map((contract) => (
        <Tr key={contract.NroContrato}>
          <Td textAlign="center">{contract.NroContrato}</Td>
          <Td textAlign="center" textTransform="capitalize">
            {formateDateToFullDate(contract.FechaInicio)}
          </Td>
          <Td textAlign="center">{contract.DniCliente}</Td>
          <Td textAlign="center">
            <Switch
              isDisabled={contract.FechaFin !== null}
              isChecked={contract.FechaFin !== null}
              onChange={() => props.onChange(contract.NroContrato)}
            />
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default ContractsTableRows;
