import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";

type Props = {
  primaryBtn: {
    text: string;
    type?: "submit" | "reset" | "button";
    action?: () => unknown;
  };
  secondaryBtn?: {
    text: string;
    type?: "submit" | "reset" | "button";
    action?: () => unknown;
  };
};

const ActionButtons = (props: Props) => {
  let secondaryButton = null;

  if (props.secondaryBtn) {
    secondaryButton = (
      <Button
        type={props.secondaryBtn.type || "button"}
        variant="outline"
        colorScheme="teal"
        mr={{ lg: "2" }}
        mb={{ base: "2", lg: "0" }}
        onClick={props.secondaryBtn.action}
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
        type={props.primaryBtn.type || "button"}
        colorScheme="teal"
        onClick={props.primaryBtn.action}
      >
        {props.primaryBtn.text}
      </Button>
    </Flex>
  );
};

export default ActionButtons;
