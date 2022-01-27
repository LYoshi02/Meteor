import { Box, Heading, Stack } from "@chakra-ui/react";
import Link from "../../ui/link";

type Props = {
  title: string;
  items: string[];
};

const FooterList = (props: Props) => {
  return (
    <Box>
      <Heading as="h3" fontSize="3xl">
        {props.title}
      </Heading>
      <Stack
        mt={{ base: "4", md: "8" }}
        as="ul"
        listStyleType="none"
        fontSize="lg"
        spacing="4"
      >
        {props.items.map((item) => (
          <Box as="li" key={item}>
            <Link href="/">{item}</Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default FooterList;
