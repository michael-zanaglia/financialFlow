import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Table, VStack, Text, Input, InputAddon, Group } from "@chakra-ui/react";
import { DialogRoot, DialogTrigger } from "../../../src/components/ui/dialog";
import { useUserStore } from "../utils/store/useUserStore";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { deepViolet, white, softBlack, lavande } from "../utils/fontColor";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import { Auth } from "../utils/types";
import { usePage } from "@inertiajs/react";

interface UserHistory {
    amount?: number;
    date?: EpochTimeStamp;
    from?: number;
    to?: number;
    toName?: string;
    fromName?: string;
}
interface UserHistoryProps {
    userHistory: UserHistory[];
    auth: Auth;
}

interface ToogleTable {
    date: boolean;
    amount: boolean;
}

const UserHistory : React.FC<UserHistoryProps> = ({ userHistory, auth }) => {
    const { user, setUser} = useUserStore();
    const page: any = usePage();
    const [toogleTable, setToogleTable] = useState<ToogleTable>({
        date : false,
        amount: false,
    });
    const [originalHistory, setOriginaldHistory] = useState(userHistory?.sort((a,b)=>Number(b?.date) - Number(a?.date)));
    const [sortedHistory, setSortedHistory] = useState(userHistory?.sort((a,b)=>Number(b?.date) - Number(a?.date)));
    const [previousToogle, setPreviousToogle] = useState<string|null>(null)    

    useEffect(()=>{
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.props?.csrf_token})
        }
    },[auth])

    useEffect(()=>{
        if(userHistory){
            let activeKey = Object.keys(toogleTable).find(key=>toogleTable[key as keyof ToogleTable])
            if(activeKey){
                const sortedData = [...sortedHistory].sort((a, b) => {
                    const valueA = a[activeKey as keyof UserHistory]; // Accéder dynamiquement à la propriété de UserHistory
                    const valueB = b[activeKey as keyof UserHistory];
        
                    return valueB && valueA ? Number(valueA) - Number(valueB) : 0;
                });
                setSortedHistory(sortedData);
                setPreviousToogle(activeKey);
            } else {
                const sortedData = [...sortedHistory].sort((a, b) => {
                    const valueA = a[previousToogle as keyof UserHistory];
                    const valueB = b[previousToogle as keyof UserHistory];
        
                    return valueB && valueA ? Number(valueB) - Number(valueA) : 0;
                });
                setSortedHistory(sortedData);
            }
        }
        
    },[toogleTable])

    function handleSearch(e: ChangeEvent<HTMLInputElement>){
        const value = e.target.value.toLowerCase();
        let filteredHistory = originalHistory.filter((history)=> {
            const formattedDate : string = history?.date ? new Date(history.date * 1000).toLocaleDateString().toString().toLowerCase() : "";
            const receiver : string = history?.toName ? history.toName.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : history?.fromName ? history.fromName.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
            const amount : string = history?.amount ? history.amount.toString().toLowerCase()  : "";

            return (
                formattedDate?.includes(value) ||
                receiver?.includes(value) ||
                amount?.includes(value) 
            )       
    });
        console.log(filteredHistory)
        setSortedHistory(filteredHistory);
    }
    

    return (
        <Box w={'100vw'} minH={'100vh'} bg={white} paddingBottom={'20px'}>
            <Header/>
            <VStack>
                <Group attached w={"70%"}>
                    <Input placeholder="Rechercher..." borderRight={"none"} focusRingColor={deepViolet} onChange={handleSearch} />
                    <InputAddon borderLeft={"none"}><CiSearch color={softBlack} size={"20px"}/></InputAddon>
                </Group>
                { userHistory ? 
                    <Table.Root  w={'70%'} interactive bg={'deepViolet'}>
                        <Table.Header>
                            <tr>
                            <Table.ColumnHeader color={'white'} w={'50px'}>Type</Table.ColumnHeader>
                            <Table.ColumnHeader 
                                color={'white'} 
                                w={'50px'} 
                                onClick={()=>setToogleTable((prev) => ({date: !prev.date,amount:false}))}
                                cursor={'pointer'}
                                bg={{ base: 'deepViolet', _hover: lavande }}
                            >
                                <Text display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1}>
                                    Date
                                    {toogleTable.date ? <VscTriangleUp /> : <VscTriangleDown />}
                                </Text>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader color={'white'}>Titulaire</Table.ColumnHeader>
                            <Table.ColumnHeader color={'white'} w={'5px'}></Table.ColumnHeader>
                            <Table.ColumnHeader color={'white'} minW={'50px'}>Transactionnaire</Table.ColumnHeader>
                            <Table.ColumnHeader 
                                color={'white'} 
                                w={'50px'} 
                                onClick={()=>setToogleTable((prev) => ({ date:false, amount: !prev.amount }))}
                                cursor={"pointer"}
                                bg={{ base: 'deepViolet', _hover: '#7b5985' }}
                            >
                                <Text display={'flex'} alignItems={'center'} gap={1}>
                                    Montant
                                    {toogleTable.amount ? <VscTriangleUp color={white} /> : <VscTriangleDown color={white} />}
                                </Text>

                            </Table.ColumnHeader>
                            </tr> 
                        </Table.Header>
                        <Table.Body color={"softBlack"}>
                            {

                                sortedHistory.map((history, index)=>{

                                    return (
                                        <Table.Row key={history?.date} color={{ base: 'softBlack', _hover: 'white' }} bg={{ base: index%2===0?  'gray.200' : '#F7F7F7' , _hover: '#c7b4cd' }} border='1px solid #b5b5b5' transition={'0.2s all ease-out'}>
                                            <Table.Cell></Table.Cell>
                                            <Table.Cell>{ history?.date ? new Date(history.date * 1000).toLocaleDateString() : 'N/A' }</Table.Cell>
                                            <Table.Cell>{ history?.from ? `${user?.firstname} ${user?.name}` : 'N/A' }</Table.Cell>
                                            <Table.Cell>{ user?.id == history?.from ? <MdKeyboardDoubleArrowRight color="red" size={'20px'}/> :  <MdKeyboardDoubleArrowLeft color="green" size={'20px'}/> }</Table.Cell>
                                            <Table.Cell>
                                                <DialogRoot placement={'center'} motionPreset="slide-in-bottom">
                                                    <DialogTrigger>
                                                        <Text cursor={'pointer'}>
                                                           { user?.id == history?.from ? history?.toName : history?.fromName} 
                                                        </Text>
                                                    </DialogTrigger>
                                                    <Modal fullname={ user?.id == history?.from ? history?.toName : history?.fromName} id={user?.id == history?.from ? history?.to : history?.from}/>
                                                </DialogRoot>
                                            </Table.Cell>
                                            <Table.Cell textAlign={'end'}>{ user?.id == history?.from ? '- ' + history?.amount : '+ ' + history?.amount } €</Table.Cell>
                                        </Table.Row>  
                                    )

                                })
                            }
                        </Table.Body>
                    </Table.Root>
                    : <Text fontStyle={'italic'} fontWeight={'300'}>Vide pour le moment</Text>
                }
            </VStack>
        </Box>
    )
}
export default UserHistory