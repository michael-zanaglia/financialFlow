import React, { useState } from "react";
import {
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "../../../src/components/ui/drawer";
import { Button } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react";
import MenuAccordion from "./MenuAccordion";
  
export const Drawer = () => {
    const [open, setOpen] = useState(false)
  
    return (
      <DrawerRoot open={open} onOpenChange={(e: any) => setOpen(e.open)} placement={'start'}>
        <DrawerBackdrop/>
        <DrawerTrigger>
          <Button variant="outline" size="sm">
            Menu
          </Button>
        </DrawerTrigger>
        <DrawerContent bg={'softBlack'} color={'white'}>
            <DrawerHeader>
                <DrawerTitle color={'white'}>Menu</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>
                <MenuAccordion/>
            </DrawerBody>
            <DrawerCloseTrigger color={'white'}/>
        </DrawerContent>
      </DrawerRoot>
    )
}