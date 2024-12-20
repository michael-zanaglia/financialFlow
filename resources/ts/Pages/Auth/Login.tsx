import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Field } from "../../../../src/components/ui/field";
import { Checkbox } from "../../../../src/components/ui/checkbox";
import { deepViolet } from "../../utils/fontColor";
import { 
    Input,
    Box,
    defineStyle,
    Button,
    Link,
    Card,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";

export default function Login(){
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const [showCard, setShowCard] = useState<boolean>(false)
    const showCardStyle:React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showCard ? 'translateY(0)' : 'translateY(15px)',
        opacity: showCard ? "1" : "0",
    } 

    const floatingStyles = defineStyle({
        pos: "absolute",
        bg: "transparent",
        px: "0.5",
        top: "-5",
        insetStart: "2",
        fontWeight: "normal",
        pointerEvents: "none",
        transition: "position",
        _peerPlaceholderShown: {
          color: "fg.muted",
          top: "2.5",
          insetStart: "3",
        },
        _peerFocusVisible: {
          color: "deepViolet",
          top: "-6",
          insetStart: "2",
        },
      })
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowCard(true)
        },300)

        return() => clearTimeout(timer);
    },[])
    
    function submit(e:React.FormEvent){
        e.preventDefault();
        post('/login');
    }

    return (
        <Box bgGradient="to-t" gradientFrom="#F5F5F5" gradientTo="deepViolet" h={'100vh'} w={'100vw'}>
            <Flex as={'div'} justify={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
                <Card.Root as={'form'} w={'30%'} minW={'300px'} variant={'elevated'} style={showCardStyle} onSubmit={submit}>
                    <Card.Header>
                        <Card.Title>Connexion</Card.Title> 
                    </Card.Header>

                    <Card.Body>    
                        <Stack gap={'1.5em'}>
                            <Box pos={'relative'}> 
                                <Input 
                                    type="email" 
                                    className="peer" 
                                    placeholder="" 
                                    focusRingColor={deepViolet} 
                                    value={data.email} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)} 
                                    required
                                /> 
                                <Field css={floatingStyles}>Email</Field>
                            </Box>
                            
                            <Box pos={'relative'}> 
                                <Input 
                                    type="password" 
                                    className="peer" 
                                    placeholder="" 
                                    focusRingColor={deepViolet} 
                                    value={data.password} 
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('password', e.target.value)} 
                                    required
                                /> 
                                <Field css={floatingStyles}>Mot de passe</Field>
                            </Box>

                            <Checkbox 
                                _checked={{"& .chakra-checkbox__control": { bg: deepViolet, borderColor: deepViolet }}} 
                                variant={'solid'} 
                                color={'softBlack'} 
                                cursor={'pointer'} 
                                value={data.remember} 
                                onChange={(e: ChangeEvent<HTMLInputElement>)=> setData('remember', e.target.checked)} 
                            >
                                Rester connecté
                                </Checkbox>
                        </Stack>              
                    </Card.Body>
                    
                    <Button type="submit" alignSelf={'center'} bg={{base:'deepViolet', _hover:'purple.700'}} disabled={processing}>
                        Se connecter
                    </Button>

                    {(errors?.email || errors?.password) && <Text color={'red.500'} textAlign={'center'} pt={2}>Il y a une erreur des vos identifiants. Veuillez rééssayer.</Text>}

                    <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                        <Link href="/register" color={'deepViolet'} fontSize={'sm'} focusRing={'none'}>Vous n'etes pas inscrit ?</Link>
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Box>
    )
}