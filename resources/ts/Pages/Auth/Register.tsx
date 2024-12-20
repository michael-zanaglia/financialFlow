import React, {ChangeEvent, useEffect, useState} from "react";
import { useForm } from "@inertiajs/react";
import { Field } from "../../../../src/components/ui/field";
import { Checkbox } from "../../../../src/components/ui/checkbox";
import { deepViolet } from "../../utils/fontColor";
import { 
    VStack, 
    Fieldset,
    Input,
    Box,
    defineStyle,
    Button,
    Link,
    Flex,
    Card,
    Stack,
    Text
} from "@chakra-ui/react";

export default function Login(){
    const [showCard, setShowCard] = useState<boolean>(false)
    const showCardStyle:React.CSSProperties = {
        transition: 'all 0.4s ease-in-out',
        transform: showCard ? 'translateY(0)' : 'translateY(-15px)',
        opacity: showCard ? "1" : "0",
    } 
    const {  data, setData, post, processing, errors } = useForm({
        name: '',
        firstname: '',
        email: '',
        solde: '',
        password: '',
        password_confirmation: '',
        terms: false

    })

    function register(e: React.FormEvent){
        e.preventDefault();
        post('/register')
    }

    useEffect(()=>{
            const timer = setTimeout(()=>{
                setShowCard(true)
            },300)

            return() => clearTimeout(timer);
    },[])
    return (
        <Box bgGradient="to-t" gradientFrom="#F5F5F5" gradientTo="deepViolet" h={'100vh'} w={'100vw'} >
            <Flex as={'div'} justify={'center'} alignItems={'center'} h={'100%'} w={'100%'}>
                <Card.Root as={'form'} w={'30%'} minW={'300px'} variant={'elevated'} style={showCardStyle} onSubmit={register}>
                    <Card.Header>
                        <Card.Title>Inscription</Card.Title> 
                    </Card.Header>

                    <Card.Body>    
                        <Stack gap={'0.5em'}>
                            <Field label='Nom' required>
                                <Input type="text" focusRingColor={deepViolet} value={data.name} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('name', e.target.value)} required/>
                            </Field>
                            {errors.name && <Text color={'red'}>{errors.name}</Text>}

                            <Field label='Prénom' required>
                                <Input type="text" focusRingColor={deepViolet} value={data.firstname} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('firstname', e.target.value)} required/>
                            </Field>
                            {errors.firstname && <Text color={'red'}>{errors.firstname}</Text>}

                            <Field label='Email' required>
                                <Input type="email" focusRingColor={deepViolet} value={data.email} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('email', e.target.value)} required/>
                            </Field>
                            {errors.email && <Text color={'red'}>{errors.email}</Text>}
                            
                            <Field label='Veuillez indiquez un solde de départ' required>
                                <Input type="text" focusRingColor={deepViolet} value={data.solde} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('solde', e.target.value)} required/>
                            </Field>
                            {errors.solde && <Text color={'red'}>{errors.solde}</Text>}    

                            <Field label='Mot de passe' required>
                                <Input type="password" focusRingColor={deepViolet} value={data.password} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('password', e.target.value)} required/>
                            </Field>
                            {errors.password && <Text color={'red'}>{errors.password}</Text>}

                            <Field label='Confirmer le mot de passe' required>
                                <Input type="password" focusRingColor={deepViolet} value={data.password_confirmation} onChange={(e: ChangeEvent<HTMLInputElement>)=>setData('password_confirmation', e.target.value)} required/>
                            </Field>  
                            <Checkbox _checked={{"& .chakra-checkbox__control": { bg: deepViolet, borderColor: deepViolet }}} variant={'solid'} color={'softBlack'} cursor={'pointer'} onChange={(e: ChangeEvent<HTMLInputElement>) => setData('terms', e.target.checked)}>Accepter les conditions d'utilisations</Checkbox>
                        </Stack>              
                    </Card.Body>
                    
                    <Button type="submit" alignSelf={'center'} bg={{base:'deepViolet', _hover:'purple.700'}} disabled={processing}>
                        S'inscrire
                    </Button>

                    <Card.Footer justifyContent={"flex-end"} mt={'1em'}>
                        <Link href="/login" color={'deepViolet'} fontSize={'sm'} focusRing={'none'}>Vous avez deja un compte ?</Link>
                    </Card.Footer>
                </Card.Root>
            </Flex>
        </Box>
    )
}