"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Sling as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import LogoutButton from "../Buttons/LogoutButton/logoutButton";
import PostAuthor from "../PostAuthor/postAuthor";
import { UserType } from "@/types/types";

type Props = {
  user: UserType;
}

export const BurgerMenu = (props: Props) => {

  const {user} = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button aria-label="Open Menu">
          <Hamburger color="gray" toggled={isOpen} toggle={setIsOpen} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50"
          onClick={() => setIsOpen(false)}
        />

        <Dialog.Content
          className="fixed right-0 top-0 h-full w-64 bg-white p-6 shadow-lg transition-transform duration-300"
          onInteractOutside={() => setIsOpen(false)}
        >
          <PostAuthor userId={user.id} author={user.username} timeAgo="" slug={`/ei/${user.username}`}/>
          <Dialog.Title className="text-lg font-semibold mb-4">
            Menu
          </Dialog.Title>

          <nav className="flex flex-col gap-3">
            <a href="/" onClick={() => setIsOpen(false)}>Home</a>
            <LogoutButton />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
