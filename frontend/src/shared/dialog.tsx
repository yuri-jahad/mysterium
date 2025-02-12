import { XIcon } from "lucide-react";
import { Stack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { css } from "styled-system/css";
import {
  GithubIcon,
  GoogleIcon,
  DiscordIcon,
} from "@/auth/components/social-icons";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useActor } from "@xstate/react";
import {
  globalMachine,
  modalMachine,
} from "@/websocket/machine/global-machine";
import type { Services } from "@/websocket/machine/socket-machine";
import AuthButtons from "@/auth/components/auth-buttons";

export const DialogFull = (props: Dialog.RootProps) => {
  const [state, send] = useActor(globalMachine);
  const [stateModals, sendModal] = useActor(modalMachine);
  const isAuthenticated = state.matches("authenticating");

  const handleAuth = (service: Services) => {
    send({ type: "AUTH.SERVICE", service });
  };

  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>
        <Button>S'authentifier</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner className={css({ position: "fixed", inset: "0" })}>
        <Dialog.Content
          className={css({
            height: "100vh",
            width: "100vw",
            bg: "black",
            position: "fixed",
            inset: "0",
          })}
        >
          <Stack gap="8" p="6" height="full">
            <Stack gap="1">
              <Dialog.Title>
                {isAuthenticated ? "Profile" : "Welcome back!"}
              </Dialog.Title>
            </Stack>

            {!isAuthenticated ? (
              <Stack gap="6">
                <div className={css({
                  display: "flex",
                  gap: "4",
                  justifyContent: "center",
                  mt: "4",
                })}>
                  <AuthButtons/>
                </div>

                <Input
                  value={stateModals.context.username.value}
                  onChange={(e) => sendModal({ 
                    type: "UPDATE_USERNAME", 
                    value: e.target.value 
                  })}
                  placeholder="Nom d'utilisateur"
                  aria-invalid={!stateModals.context.username}
                />
                
                {stateModals.context.username.error && (
                  <div className={css({ 
                    color: "red.500", 
                    fontSize: "sm" 
                  })}>
                    {stateModals.context.username.error}
                  </div>
                )}

                <div className={css({
                  color: "gray.400",
                  textAlign: "center",
                })}>
                  ou
                </div>
              </Stack>
            ) : (
              <div className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6",
                w: "full",
                mt: "6",
              })}>
                {/* Profile content here */}
              </div>
            )}

            <Stack gap="3" direction="row" width="full" margin="auto">
              <Button className={css({ 
                width: "200px", 
                margin: "0 auto" 
              })}>
                Sauvegarder
              </Button>
            </Stack>
          </Stack>

          <Dialog.CloseTrigger
            asChild
            className={css({
              position: "absolute",
              top: "2",
              right: "2",
            })}
          >
            <IconButton aria-label="Fermer" variant="ghost" size="sm">
              <XIcon />
            </IconButton>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};