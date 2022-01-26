import { HStack, IconButton } from "@chakra-ui/react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "../../../assets/icons";

const socialMediaList = [
  { name: "facebook", url: "http://www.facebook.com", icon: <FacebookIcon /> },
  {
    name: "instagram",
    url: "http://www.instagram.com",
    icon: <InstagramIcon />,
  },
  { name: "twitter", url: "http://www.twitter.com", icon: <TwitterIcon /> },
  { name: "youtube", url: "http://www.youtube.com", icon: <YoutubeIcon /> },
];

const SocialMedia = () => {
  return (
    <HStack mt="4" spacing="4">
      {socialMediaList.map((social) => (
        <a href={social.url} target="_blank" rel="noreferrer" key={social.name}>
          <IconButton
            variant="solid"
            aria-label={social.name}
            icon={social.icon}
            p="3"
            borderRadius="full"
            colorScheme="gray"
            size="lg"
          />
        </a>
      ))}
    </HStack>
  );
};

export default SocialMedia;
