import React from "react";
import { DialogBody, DialogHeader, DialogContent, DialogCloseTrigger, DialogFooter } from "../../../src/components/ui/dialog";
import { Button } from "@chakra-ui/react";
import { router } from "@inertiajs/react";

interface ModalProps {
    fullname?: string;
    id?: number;
}

const Modal: React.FC<ModalProps> = ({ fullname, id }) => {
    function handleRedirection(){
        router.post('/actions/send', { id })
    }
    return(
        <DialogContent>
            <DialogCloseTrigger />
            <DialogHeader> Contact </DialogHeader>
            <DialogBody>
                <p>{ fullname }</p>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant={'ghost'} 
                    bg={{base:'softBlack', _hover:'deepViolet'}}
                    color={'white'}
                    onClick={handleRedirection}
                >
                    Envoyer de l'argent
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default Modal;