import React, { useState } from "react";
import useSWR from "swr";
import { useUserStore } from "../utils/store/useUserStore";
import { isArrayEmpty } from "../utils/isArrayEmpty";
import axios from "axios";
import { User } from "../utils/store/useUserStore";
import { Button, HStack, Spinner, Stack, Strong, VStack } from "@chakra-ui/react";
import { softBlack, white } from "../utils/fontColor";
import { Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import { LuCheck, LuX } from "react-icons/lu";
import { Avatar } from "../../../src/components/ui/avatar";

const FriendRequest = ()=>{
    const {user, setUser} = useUserStore();
    const [listUsers, setListUsers] = useState<User[]>([])
    const fetcher = (url:string) =>{
        axios.get(url).then((response)=>{
            setListUsers(response.data)
        })
    } 
    const { data, error, isLoading } = useSWR(`/friend-list`, fetcher, { refreshInterval: 5000});
    
    function acceptReq(id: string | undefined | null){
        console.log(id)
        if(id){
            axios.post("/friend-list/accept", {
                id: id
            }).then((response)=>{
                console.log(response)
            })
        }
        
    }

    function refuseReq(id: string | undefined | null){
        console.log(id)
        if(id){
            axios.post("/friend-list/refuse", {
                id: id
            }).then((response)=>{
                console.log(response)
            })
        }
        
    }
    
    
    // if(isLoading){
    //     return <Spinner/>
    // }
    if(isArrayEmpty(listUsers)){
        return <Text fontStyle={'italic'} fontWeight={'300'} color={softBlack}>Vous n'avez aucune demande de link</Text>
    }


    return (
        <VStack gap={'3'}>
            {
                listUsers.map((user, index)=>(
                    <Card.Root width="100%" variant={'outline'} key={`card_${index}_${user?.id}_req`}>
                        <Card.Body>
                            <VStack mb="6" gap="3"  alignItems={'start'}>
                                <Avatar
                                    
                                    src={user?.profile_photo_url}
                                    name={`${user?.firstname} ${user.name}`}
                                />
                                <Stack gap="0">
                                    <Text fontWeight="semibold" textStyle="sm">
                                        {user?.firstname} {user.name}
                                    </Text>
                                    <Text color="fg.muted" textStyle="sm">
                                        {`#${user.email}`}
                                    </Text>
                                </Stack>
                            </VStack>
                            <Card.Description>
                                <Strong color="fg">{user?.firstname} {user.name} </Strong>
                                vous a envoyé une invitation. Vous pouvez l'accepter ou la refuser.
                            </Card.Description>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="subtle" bg={{base: softBlack, _hover:"red.600"}} color={white} flex="1" onClick={()=> user?.id && refuseReq(user.id.toString())}>
                                <LuX />
                                Unlinker
                            </Button>
                            <Button variant="subtle" bg={{base: softBlack, _hover:"blue.600"}} color={white} flex="1" onClick={()=> user?.id && acceptReq(user.id.toString())} >
                                <LuCheck />
                                Linker
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                    
                ))
            }
        </VStack>
        
    )
}

export default FriendRequest;