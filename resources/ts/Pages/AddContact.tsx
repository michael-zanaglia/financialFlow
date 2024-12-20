import React, {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import { Auth } from "../utils/types";
import { User, useUserStore } from "../utils/store/useUserStore";
import { Box, Button, Card, Group, HStack, Input, InputAddon, Table, Text, VStack } from "@chakra-ui/react";
import { deepViolet, lavande, softBlack, white } from "../utils/fontColor";
import Header from "../Components/Header";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Avatar } from "../../../src/components/ui/avatar";
import { DialogRoot, DialogTrigger } from "../../../src/components/ui/dialog";
import { Link } from "@inertiajs/react";
import Pagination from "../Components/Pagination";
import fetchingDataPost from "../utils/fetchingDataPost";
import { usePage }from "@inertiajs/react";
import { Spinner } from "@chakra-ui/react";
import WarningModal from "../Components/WarningModal";
import { toaster } from "../../../src/components/ui/toaster";
import { useForm } from "@inertiajs/react";
import axios from "axios";


interface AddContactsProps{
    auth?: Auth;
}

const AddContact: React.FC<AddContactsProps> = ({ auth })=>{
    const { user, setUser } = useUserStore();
    const [found, setFound] = useState<User|null>(null);
    const [note, setNote] = useState<string|null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const page: any = usePage();
    const [ data, setData ] = useState({
        mail: ''
    });
    const styleCard: React.CSSProperties = {
        opacity: show ?'1' : '0',
        transform: show  ? 'translateY(0)' : 'translateY(15px)',
        transition: 'all 0.2s ease-in-out',
    } 
    useEffect(()=>{
        console.log(auth)
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.props?.csrf_token})
        }
    },[auth])

    useEffect(()=>{
        if(found){
            setShow(true)
        } else {
            setShow(false)
        }
    },[found])

    function searchContact(e:any){
        e.preventDefault()
        setIsLoading(true)
        axios.get('/search-contact', {
            params: { mail: data.mail } 
        })
        .then((data)=>{
            if(data){
               setFound(data?.data?.found) 
               setNote(data?.data?.note)
            } else {
                setFound(null)
            }
            
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    function handleAdding(id: any){
        if(id){
            const formData = new FormData();
            formData.set("id", id.toString())
            toaster.promise(fetchingDataPost("/sendRequest", "AddContact", formData,page?.props?.csrf_token),{
                success: (data: any) =>{
                    setFound(data?.found)
                    setNote(data?.note)
                    return {title: "Votre demande a bien été envoyé"}
                }, 
                error: (err: any)=>{
                   return {title: err.message || 'Une erreur est survenue'}
                }
            })
            
        }
    }

    return (
     
        <Box w={'100vw'} minH={'100vh'} bg={white} paddingBottom={'20px'} display={"flex"} flexDirection={'column'} alignItems={'center'}>
            <Header /> 
            <VStack width={'500px'}>

                <Group attached width={'500px'} as={'form'} onSubmit={searchContact}>
                    <Input type="email" placeholder="Rechercher..." borderRight={"none"} focusRingColor={deepViolet} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData({'mail': e.target.value})} />
                    <InputAddon borderLeft={"none"} pr={'-0.5'} pl={'-0.5'}><Button bg={{base:lavande, _hover:deepViolet}} borderRadius={'0px 4px 4px 0px'} type="submit"><CiSearch color={white} size={"20px"}/></Button></InputAddon>
                </Group>
        
                {
                    isLoading ? (
                        
                        <Box>    
                            <Spinner size={'xl'} color={"deepViolet"}/>    
                        </Box>
                       
                    ): found ? (
                        <Card.Root width="320px" variant={'elevated'} style={styleCard}>
                            <Card.Body gap="2">
                                <Avatar
                                    src={found?.profile_photo_url}
                                />
                                <Card.Title mb="2">{`${found?.firstname} ${found?.name}`}</Card.Title>
                                <Card.Description fontStyle={'italic'}>
                                    {`Email : ${found?.email}`}
                                </Card.Description>
                            </Card.Body>
                            <Card.Footer justifyContent="flex-end">
                                <Button bg={{base: softBlack, _hover: note ? "green.600" : deepViolet}} color={white} onClick={()=>note ? null : handleAdding(found?.id)}>
                                    {note ? note : "Linker"}
                                </Button>
                            </Card.Footer>
                        </Card.Root>
                       ) : (
                        <Text fontStyle={'italic'} fontWeight={'300'}>Aucun résultat</Text>
                        )
                }
            </VStack>
        </Box>
        
        
    )
}

export default AddContact;