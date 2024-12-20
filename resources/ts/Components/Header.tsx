import React, { useEffect, useState } from "react";
import { Box, Flex, Link, Image, Button, HStack } from "@chakra-ui/react";
import { useUserStore } from "../utils/store/useUserStore";
import { router } from "@inertiajs/react";
import { Drawer } from "./Drawer";
import EchoListener from "./EchoListener";
import { MdNotificationImportant } from "react-icons/md";
import { isArrayEmpty } from "../utils/isArrayEmpty";


interface FriendReqState {
    friendReq: number[];
}

export default function Header(){
    const { user, setUser } = useUserStore();
    const [friendReq, setFriendReq] = useState<FriendReqState["friendReq"]>([]);

    useEffect(()=>{
        if(!isArrayEmpty(friendReq)){
          console.log("hhh", friendReq)  
        }
    }, [friendReq])
    
    async function logout(){
        setUser(null);
        router.post('/logout')
    }

    return (
        <Box w={'100vw'} bg={'transparent'} padding={'10px'}>
            <EchoListener friendReq={friendReq} setFriendReq={setFriendReq}/>
            <nav>
                <Flex as={'ul'} justify={user?.id? 'space-between' : "end"} align={'center'} ml={'3px'}>

                    
                    
                    {
                        user?.id ? 
                        <>
                        <Box pos={'relative'}>
                            {!isArrayEmpty(friendReq) && <MdNotificationImportant style={{position: 'absolute', top: '-10px', right: '-10px', zIndex: '999'}} size={'22px'} color="red" />}
                            <Drawer />
                        </Box>
                        <form method="post" onSubmit={logout}>
                            <Button 
                                type="submit"
                                variant={'ghost'} 
                                bg={{base:'softBlack', _hover:'red.600'}} 
                                color={'white'} maxH={'35px'}
                            >
                                Déconnexion
                            </Button>
                        </form>
                        </>
                        
                        :   <>
                                <Link href="/login" mr={'15px'} color={'white'}>Se connecter</Link>
                                <Link href="/register" mr={'15px'} color={'white'}>S'inscrire</Link>
                            </>
                    }
                    {/* <Link href="/dashboard" mr={'15px'} color={'white'}>Aller sur la page d'acceuil</Link> */}
                </Flex>
            </nav>
        </Box>
    )
}