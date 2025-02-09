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
import { ImageIcon, Camera, UserCircle } from "lucide-react";


const Home = () => {
  const [state, send] = useActor(globalMachine);
  const isAuthenticated = state.matches("connected");

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

  const inputContainerStyles = css({
    position: "relative",
    w: "full",
    maxW: "sm",
  });

  const inputStyles = css({
    w: "full",
    p: "4",
    pl: "12",
    bg: "gray.800",
    border: "1px solid",
    borderColor: "gray.700",
    rounded: "xl",
    color: "gray.100",
    _placeholder: { color: "gray.500" },
    _hover: { borderColor: "gray.600" },
    _focus: {
      borderColor: "indigo.500",
      ring: "1",
      ringColor: "indigo.500",
    },
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

  const avatarContainerStyles = css({
    position: "relative",
    group: "",
  });

  const avatarOverlayStyles = css({
    position: "absolute",
    inset: "0",
    rounded: "full",
    bg: "blackAlpha.600",
    opacity: "0",
    transition: "opacity 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    _groupHover: { opacity: "1" },
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
              className={baseButtonStyles}
              onClick={() => handleAuth("github")}
            >
              <GithubIcon />
            </button>
            <button
              className={baseButtonStyles}
              onClick={() => handleAuth("google")}
            >
              <GoogleIcon />
            </button>
            <button
              className={baseButtonStyles}
              onClick={() => handleAuth("discord")}
            >
              <DiscordIcon />
            </button>
          </div>

          <div className={css({ color: "gray.400", my: "6" })}>or</div>

          <div className={profileContainerStyles}>
            <div className={avatarContainerStyles}>
              <Avatar
                className={css({
                  w: "24",
                  h: "24",
                  border: "4px solid",
                  borderColor: "gray.700",
                })}
              >
                <AvatarFallback>
                  <UserCircle
                    className={css({ w: "12", h: "12", color: "gray.400" })}
                  />
                </AvatarFallback>
              </Avatar>
              <div className={avatarOverlayStyles}>
                <Camera className={css({ w: "6", h: "6", color: "white" })} />
                <input
                  type="file"
                  className={css({
                    position: "absolute",
                    inset: "0",
                    opacity: "0",
                    cursor: "pointer",
                  })}
                  accept="image/*"
                />
              </div>
            </div>

            <div className={inputContainerStyles}>
              <UserCircle className={userIconStyles} />
              <Input
                placeholder="Enter your username"
                className={inputStyles}
              />
            </div>
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
