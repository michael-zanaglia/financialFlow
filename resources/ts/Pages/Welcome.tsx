import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { 
    Box,
    Heading,
    VStack,
    Image
 } from "@chakra-ui/react";

export default function Welcome(){
    const [showHeading, setShowHeading]= useState<boolean>(false)

    const headingWelcomeStyle : React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showHeading ? 'translateY(0)' : 'translateY(15px)',
        opacity: showHeading ? "1" : "0",
    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowHeading(!showHeading)
        },300)
        return () => clearTimeout(timer);
    },[])

    return (
        <VStack overflow={'hidden'} bgGradient="to-t" gradientFrom="#F5F5F5" gradientTo="deepViolet" h={'100vh'} w={'100vw'} gap={'1.5em'} >
            <Header/>
            <VStack perspective="1000px" justify={'center'} gap={'5vh'} align={'center'}>
                <Heading as={'h1'} style={headingWelcomeStyle} translateY={"-15px"} opacity={'0'} size={'4xl'} color={'white'}>Bienvenue sur Finance Flow, suivre vos transactions n'a jamais été aussi simple !</Heading>
                <Image
                    src="/storage/home.png"
                    alt="Image 3D inclinée"
                    transform="rotateY(-40deg) rotateX(20deg)"
                    boxSize="30vw"
                    borderRadius="md"
                    boxShadow="10px 10px 30px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.2)"
                /> 
            </VStack>
        </VStack>
    )
}