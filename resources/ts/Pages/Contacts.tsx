import React, {useEffect, useState} from "react";
import { Auth } from "../utils/types";
import { User, useUserStore } from "../utils/store/useUserStore";
import { Box, Button, Group, HStack, Input, InputAddon, Table, Text, VStack } from "@chakra-ui/react";
import { deepViolet, softBlack, white } from "../utils/fontColor";
import Header from "../Components/Header";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Avatar } from "../../../src/components/ui/avatar";
import { DialogRoot, DialogTrigger } from "../../../src/components/ui/dialog";
import { Link } from "@inertiajs/react";
import Pagination from "../Components/Pagination";
import fetchingDataPost from "../utils/fetchingDataPost";
import fetchingWithDelGet from "../utils/fetchingWithDelGet";
import { usePage }from "@inertiajs/react";
import { Spinner } from "@chakra-ui/react";
import WarningModal from "../Components/WarningModal";
import { toaster } from "../../../src/components/ui/toaster";

interface ContactsProps{
    auth?: Auth;
    contacts: Contacts;
}

interface Contacts {
    links: {
        url: string|null;
        label: string;
    }[];
    data?: User[];
    current_page: number;
}

const Contacts: React.FC<ContactsProps> = ({ contacts, auth })=>{
    const { user, setUser } = useUserStore();
    const [isHover, setIsHover] = useState<number>(0);
    const [contactsUser, setContactsUser] = useState<any>(contacts);
    const [searchValue, setSearchValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const page: any = usePage()?.props
    const deleteStyle= (id : number): React.CSSProperties => ({
        transform: isHover === id ? 'rotate(180deg)' : "rotate(0deg)",
        transition: 'all 0.5s ease-in-out'
    })

    useEffect(()=>{
        console.log(contacts)
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.csrf_token})
        }
    },[auth])

    const debounce = (searchFunction :( ...args : any[]) => void, delay : number) => {
        let timer:number;
        return function (...args: any[]){
          clearTimeout(timer);
          timer = setTimeout(()=>{
            searchFunction(...args)
          }, delay);
        }
    }
    const debounceSearch = debounce(search, 300)

    function search(e: React.ChangeEvent<HTMLInputElement>){
            setIsLoading(true);
            const formData = new FormData();
            setSearchValue(e.target.value)
            formData.set("search", e.target.value);
            fetchingDataPost('/contacts', "Contact", formData, page?.csrf_token)
                .then((data) => {
                    console.log(data)
                    setIsLoading(false);
                    setContactsUser(data)
            });    
        
    }

    function handleDelete(id:number){
        if(id){
            toaster.promise(fetchingWithDelGet("/delete-contact", "Contact-suppr", id.toString(), page?.csrf_token, 'DELETE'), {
                success:()=>{
                    return {title: "Le contact à bien été supprimé !"}
                },
                error: (err: any) =>({
                  title: "Suppression échouée",
                  description: err?.message || "Une erreur est apparue dans le processus. Veuillez rééssayer",
                })
            })
        }
    }

    return (
     
        <Box w={'100vw'} minH={'100vh'} bg={white} paddingBottom={'20px'} display={"flex"} flexDirection={'column'} alignItems={'center'}>
            <Header /> 
            <VStack width={'500px'}>
                <Group attached width={'500px'}>
                    <Input placeholder="Rechercher..." borderRight={"none"} focusRingColor={deepViolet} onChange={debounceSearch} />
                    <InputAddon borderLeft={"none"}><CiSearch color={softBlack} size={"20px"}/></InputAddon>
                </Group>
        
                <Table.Root w={'500px'} variant={'outline'} borderRadius={'md'} interactive>
                    <Table.Header bg={deepViolet}>
                    <Table.Row>
                        <Table.ColumnHeader color={white}>Contact</Table.ColumnHeader>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            isLoading ? (
                                <Table.Row>
                                    <Table.Cell>    
                                        <Spinner size={'xl'} color={"deepViolet"}/>    
                                    </Table.Cell>
                                </Table.Row>
                            ): contactsUser?.data?.length > 0 ?(
                                contactsUser?.data?.map((contact: any, key: number) => (
                                    <Table.Row key={key}>
                                        <Table.Cell>
                                            <HStack justifyContent={'space-between'}>
                                                <Avatar name={contact?.name} src={contact?.profile_photo_url}/>
                                                {`${contact?.firstname} ${contact?.name}`}
                                                <Text fontStyle={'italic'} fontWeight={'300'}>{`${new Date(contact?.pivot?.created_at).toLocaleDateString()}`}</Text>
                                                <DialogRoot placement={"bottom"}>
                                                    <DialogTrigger>
                                                        <Button 
                                                            as={'div'}
                                                            variant={'ghost'} 
                                                            transition={'all 0.5s ease-in'} 
                                                            style={deleteStyle(contact?.id)} 
                                                        
                                                            onMouseEnter={()=>setIsHover(contact?.id)} 
                                                            onMouseLeave={()=>setIsHover(0)}
                                                        >
                                                            <IoMdClose color={ isHover === contact?.id ? "red" : softBlack } />
                                                        </Button>
                                                    </DialogTrigger>
                                                    
                                                    <WarningModal handleDelete={()=>handleDelete(contact?.id)}  />
                                                    
                                                </DialogRoot>
                                            </HStack>
                                        </Table.Cell>
                                        {/* <Table.Cell textAlign="end">{contact}</Table.Cell> */}
                                    </Table.Row>
                                ))
                            ):( <Table.Row>
                                    <Table.Cell>    
                                        <Text fontStyle={'italic'} fontWeight={'300'}>Votre répertoire est vide pour le moment</Text>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }
                    </Table.Body>
                </Table.Root>
                
                <Pagination links={contactsUser?.links} currentPage={contactsUser?.current_page} />
            </VStack>
        </Box>
        
        
    )
}

export default Contacts;