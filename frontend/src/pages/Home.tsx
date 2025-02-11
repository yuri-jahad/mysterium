import type { Services } from "@/websocket/machine/socket-machine";
import {
  GithubIcon,
  GoogleIcon,
  DiscordIcon,
} from "@/auth/components/social-icons";
import { globalMachine } from "@/websocket/machine/global-machine";
import { useActor } from "@xstate/react";
import { css } from "styled-system/css";
import { Avatar } from "@/components/ui/avatar";
import { useEffect } from "react";

const Home = () => {
  const [state, send] = useActor(globalMachine);
  const isAuthenticated = state.matches("authenticating");

  const handleAuth = (service: Services) => {
    send({ type: "AUTH.SERVICE", service });
  }; 

  const containerStyles = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8",
    p: "8",
    minH: "400px",
    w: "full",
    maxW: "md",
    mx: "auto",
    bg: "gray.900",
    border: "1px solid",
    borderColor: "gray.800",
    rounded: "2xl",
    shadow: "xl",
    position: "relative",
    overflow: "hidden",
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-50%",
      width: "200%",
      height: "2px",
      background:
        "linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)",
    },
  });

  const buttonContainerStyles = css({
    display: "flex",
    gap: "4",
    w: "full",
    justifyContent: "center",
    mt: "4",
  });

  const baseButtonStyles = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: "4",
    rounded: "xl",
    shadow: "md",
    border: "1px solid",
    borderColor: "gray.700",
    transition: "all 0.2s ease",
    w: "12",
    h: "12",
    _hover: {
      transform: "translateY(-2px)",
      shadow: "lg",
      borderColor: "gray.600",
    },
    _active: {
      transform: "translateY(0)",
      shadow: "sm",
    },
  });

  const profileContainerStyles = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6",
    w: "full",
    mt: "6",
  });

  const userIconStyles = css({
    position: "absolute",
    left: "4",
    top: "50%",
    transform: "translateY(-50%)",
    color: "gray.400",
    w: "5",
    h: "5",
  });

  return (
    <div className={containerStyles}>
      <h2
        className={css({
          fontSize: "2xl",
          fontWeight: "bold",
          color: "gray.100",
          mb: "6",
        })}
      >
        {isAuthenticated ? "Profile" : "Welcome back!"}
      </h2>

      {!isAuthenticated ? (
        <>
          <div className={buttonContainerStyles}>
            <button
              aria-label="btn github"
              className={baseButtonStyles}
              onClick={() => handleAuth("github")}
            >
              <GithubIcon />
            </button>
            <button
              aria-label="btn google"
              className={baseButtonStyles}
              onClick={() => handleAuth("google")}
            >
              <GoogleIcon />
            </button>
            <button
              aria-label="btn discord"
              className={baseButtonStyles}
              onClick={() => handleAuth("discord")}
            >
              <DiscordIcon />
            </button>
          </div>

          <div className={css({ color: "gray.400", my: "6" })}>or</div>

          <div className={profileContainerStyles}>
            <div>{state.context.auth.username}</div>
            <Avatar src={state.context.auth.avatar || ""}  />
          </div>
        </>
      ) : (
        <div className={profileContainerStyles}>
          {/* Profile content here */}
        </div>
      )}
    </div>
  );
};

export default Home;


