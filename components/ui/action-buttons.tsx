import { Button, ButtonOptions } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

type Props = {
  primaryBtn: {
    text: string;
    action?: () => unknown;
    btnConfig?: ButtonOptions;
  };
  secondaryBtn?: {
    text: string;
    action?: () => unknown;
    btnConfig?: ButtonOptions;
  };
};

const ActionButtons = (props: Props) => {
  let secondaryButton = null;

  if (props.secondaryBtn) {
    secondaryButton = (
      <Button
        variant="outline"
        colorScheme="teal"
        onClick={props.secondaryBtn.action}
        mr={{ lg: "2" }}
        mb={{ base: "2", lg: "0" }}
        {...props.secondaryBtn.btnConfig}
      >
        {props.secondaryBtn.text}
      </Button>
    );
  }

  return (
    <Flex
      mt="4"
      justifyContent={{ lg: "flex-end" }}
      flexDirection={{ base: "column", lg: "row" }}
    >
      {secondaryButton}
      <Button
        onClick={props.primaryBtn.action}
        colorScheme="teal"
        {...props.primaryBtn.btnConfig}
      >
        {props.primaryBtn.text}
      </Button>
    </Flex>
  );
};

export default ActionButtons;
