import React from "react";
import { DialogActionTrigger, DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "../../../src/components/ui/dialog";
import { Text, Button } from "@chakra-ui/react";
import { softBlack } from "../utils/fontColor";

interface WarningModalProps {
        handleDelete: VoidFunction
}

const WarningModal: React.FC<WarningModalProps> = ({ handleDelete }) =>{
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Etes vous sûr de vouloir supprimer ce contact ?</DialogTitle>
            </DialogHeader>
            <DialogBody>
                <Text>
                    Une fois cette action validée, il ne sera plus possible d'effectuer des transactions avec cette personne.
                </Text>
            </DialogBody>
            <DialogFooter>
                <DialogActionTrigger>
                    <Button bg={{base: softBlack, _hover: "blue.600"}}>
                        Annuler
                    </Button>
                </DialogActionTrigger>
                <DialogActionTrigger>
                    <Button bg={{base: softBlack, _hover: "red.600"}} onClick={handleDelete}>
                        Valider
                    </Button>
                </DialogActionTrigger>
            </DialogFooter>
            <DialogCloseTrigger/>
        </DialogContent>
        
    )
}

export default WarningModal;