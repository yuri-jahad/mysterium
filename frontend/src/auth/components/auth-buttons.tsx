import type { Services } from "@/websocket/machine/socket-machine";
import {
  GithubIcon,
  GoogleIcon,
  DiscordIcon,
} from "@/auth/components/social-icons";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";

const AuthButtons = () => {
  const [state, send] = useActor(globalMachine);

  const handleAuth = (service: Services) => {
    send({ type: "AUTH.SERVICE", service });
  };

  const containerStyles = flex({
    justify: "center",
    align: "center",
    gap: "6",
    p: "8",
    maxW: "2xl",
    mx: "auto",
    backdropFilter: "blur(16px)",
    borderRadius: "2xl",
    border: "1px solid",
    borderColor: "gray.800",
    bg: "gray.900",
  });

  const baseButtonStyles = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    w: "16",
    h: "16",
    rounded: "xl",
    shadow: "md",
    border: "1px solid",
    borderColor: "gray.700",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    _hover: {
      transform: "translateY(-2px)",
      shadow: "lg",
      borderColor: "gray.600",
    },
    _active: {
      transform: "translateY(1px)",
      shadow: "sm",
    },
  });

  const githubStyles = css({
    bg: "gray.800",
    color: "white",
    _hover: {
      bg: "gray.700",
    },
  });

  const googleStyles = css({
    bg: "gray.800",
    color: "white",
    _hover: {
      bg: "gray.700",
    },
  });

  const discordStyles = css({
    bg: "#404EED",
    color: "white",
    _hover: {
      bg: "#4752C4",
    },
  });

  const iconWrapperStyles = css({
    w: "6",
    h: "6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: "1",
  });

  return (
    <div
      className={containerStyles}
      role="group"
      aria-label="Options de connexion sociale"
    >
      <button
        className={`${baseButtonStyles} ${githubStyles}`}
        aria-label="Se connecter avec Github"
        onClick={() => handleAuth("github")}
      >
        <span className={iconWrapperStyles}>
          <GithubIcon />
        </span>
      </button>

      <button
        className={`${baseButtonStyles} ${googleStyles}`}
        aria-label="Se connecter avec Google"
        onClick={() => handleAuth("google")}
      >
        <span className={iconWrapperStyles}>
          <GoogleIcon />
        </span>
      </button>

      <button
        className={`${baseButtonStyles} ${discordStyles}`}
        aria-label="Se connecter avec Discord"
        onClick={() => handleAuth("discord")}
      >
        <span className={iconWrapperStyles}>
          <DiscordIcon />
        </span>
      </button>
    </div>
  );
};

export default AuthButtons;
