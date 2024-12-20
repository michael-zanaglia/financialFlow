import React, {useState} from "react";
import { FaUserCircle } from "react-icons/fa"
import { AiFillThunderbolt } from "react-icons/ai";
import { 
    AccordionItem,
    AccordionItemContent,
    AccordionItemTrigger,
    AccordionRoot
} from "../../../src/components/ui/accordion";
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger
} from "../../../src/components/ui/dialog";
import { HStack, Text, Stack, Button, Link, VStack} from "@chakra-ui/react";
import { Avatar } from "../../../src/components/ui/avatar";
import { useUserStore } from "../utils/store/useUserStore";
import { deepViolet, white } from "../utils/fontColor";
import FriendRequest from "./FriendRequest";


export default function MenuAccordion(){
    const {user, setUser} = useUserStore();
    const [value, setValue] = useState("a");
    const items = [
        {
            title: 'Contact', 
            text: [
                { page: "Voir mes contacts", link: "/contacts" },
                { page: "Ajouter des contacts", link: "/add-contact"},
                { page: "Demande de link", link: ""}
            ], 
            icon: <FaUserCircle/>,
            value: 'b'
        },
        {
            title: 'Actions', 
            text: [
                { page: "Envoyer de l'argent", link: "/actions/send" },
                { page: "Mon historique", link: "/history" },
            ], 
            icon: <AiFillThunderbolt />,
            value: 'c'
        }
    ]
    return(
        <Stack>
            <AccordionRoot collapsible onValueChange={(e: any) => setValue(e.value)} value={value}>
                <AccordionItem value={'a'}>
                    <AccordionItemTrigger>
                        <HStack>
                            <Avatar src={user?.profile_photo_url} size="xl" name='pp'/>
                            <Text color={'white'}>{user?.firstname}</Text>
                        </HStack>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                        <Link href="/profile">
                            <Button type="button">Editer le profile</Button>  
                        </Link>
                          
                    </AccordionItemContent>
                </AccordionItem>
                {items.map((item, index) => (
                    <AccordionItem key={`${index}_${item.title}`} value={item.value}>
                        <AccordionItemTrigger color={'white'}>{item.icon}{item.title}</AccordionItemTrigger>
                        <AccordionItemContent>
                            <VStack>
                                {
                                    item.text.map((x, i)=>(
                                        x.link.includes("/") ?
                                            <Link href={x.link} key={`${x.page}_${x.link}`} color={'white'}>{x.page}</Link> 
                                            :
                                            <DialogRoot motionPreset="slide-in-bottom" scrollBehavior={"outside"} size={'sm'} key={`${x.page}_${x.link}`}>
                                            <DialogTrigger asChild>
                                              <Text color={{base: white, _hover: deepViolet}} textDecor={{base: 'none', _hover:'underline'}} cursor={'pointer'}>{x.page}</Text>
                                            </DialogTrigger>
                                            <DialogContent>
                                              <DialogHeader>
                                                <DialogTitle>Vos demandes de link</DialogTitle>
                                              </DialogHeader>
                                              <DialogBody>
                                                <FriendRequest/>
                                              </DialogBody>
                                              <DialogCloseTrigger />
                                            </DialogContent>
                                          </DialogRoot>
                                        
                                    ))
                                }
                            </VStack>
                                            
                        </AccordionItemContent>
                    </AccordionItem>
                ))}
            </AccordionRoot>
            <Link href={"/dashboard"} color={'white'}>Retourner à l'acceuil</Link>
        </Stack>
        
    )
}