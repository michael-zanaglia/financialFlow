import React, { useEffect, useState } from "react";
import { Box, Image, Grid, GridItem, Card, VStack, Text, Heading, HStack } from "@chakra-ui/react";
import { User, useUserStore } from "../utils/store/useUserStore";
import Header from "../Components/Header";
import { Drawer } from "../Components/Drawer";
import fetchingDataPost from "../utils/fetchingDataPost";
import { Auth } from "../utils/types";
import { usePage } from "@inertiajs/react";
import TransactionChart from "../Layouts/Chart/TansactionChart";
import UserChart from "../Layouts/Chart/UserChart";


interface DashboardProps {
    auth : Auth;
    userHistory: any[]
}

const Dashboard: React.FC<DashboardProps> = ({ auth, userHistory }) => {
    const { user, setUser } = useUserStore();
    const page: any = usePage()

    useEffect(()=>{
        console.log(userHistory)
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.props?.csrf_token})
        }
    },[auth])

    
    return(
        <Box bgColor={'#F5F5F5'} h={'100vh'} w={'100vw'} overflow={'hidden'}>
            <Grid
                templateRows={"auto repeat(2,1fr) 2fr"}
                templateColumns={"repeat(5,1fr)"}
                gap={3}
                h={'100%'}
                padding={'3px'}
            >
                <GridItem colSpan={5} pos={'relative'}>
              
                <Header/>
        
                </GridItem>
                <GridItem colSpan={1} rowSpan={2}>
                    <Card.Root variant={'elevated'} h={'100%'} bg={'deepViolet'}>
                        <Card.Title alignSelf={'center'} color={'white'} as={'div'}>
                            <Heading size={'2xl'} m={2}>Bienvenue {user?.firstname}</Heading> 
                        </Card.Title>
                        <Card.Body w={'auto'}>
                            <VStack gap={5}>
                                <Image src={auth?.user?.profile_photo_url} w={'100px'} h={'100px'} borderRadius={'full'} fontVariant={'elevated'} alignSelf={'center'}/>
                                <Box>
                                    
                                    <Text fontWeight={'lighter'} color={'white'} fontSize={'3xl'}>Solde : {auth?.user?.solde} €</Text>
                                </Box>
                                
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                </GridItem>
                <GridItem colSpan={2} rowSpan={2}>
                    <Card.Root variant={'elevated'} h={'100%'}>
                        <Card.Title alignSelf={'center'} color={'softBlack'}>
                            Vous avez récemment échangé avec...
                        </Card.Title>
                        <Card.Body w={'auto'}>
                           1
                        </Card.Body>
                    </Card.Root>
                </GridItem>
                <GridItem rowSpan={2}>
                    <Card.Root variant={'elevated'} h={'100%'}>
                        <Card.Body w={'auto'}>
                           2
                        </Card.Body>
                    </Card.Root>
                </GridItem>
                <GridItem rowSpan={2}>
                    <Card.Root variant={'elevated'} h={'100%'}>
                        <Card.Title alignSelf={'center'} color={'softBlack'}>
                            Ceux avec qui vous échangé le plus
                        </Card.Title>
                        <Card.Body w={'auto'}>
                           <UserChart/>
                        </Card.Body>
                    </Card.Root >
                </GridItem>
                <GridItem colSpan={5}>
                    <Card.Root variant={'elevated'} h={'100%'} bg={'softBlack'} borderRadius={'4px 4px 0 0'}>
                        <Card.Body w={'auto'}>
                           <TransactionChart/>
                        </Card.Body>
                    </Card.Root>
                </GridItem>
            </Grid>
        </Box>
        
    )
}

export default Dashboard;