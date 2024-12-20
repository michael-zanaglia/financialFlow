import React, {ChangeEvent, useEffect, useState, useRef} from "react";
import fetchingDataPost from "../utils/fetchingDataPost";
import { useUserStore } from "../utils/store/useUserStore";
import Header from "../Components/Header";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { Field } from "../../../src/components/ui/field";
import { 
    Box, 
    Card, 
    HStack, 
    Flex, 
    Heading, 
    Input, 
    Button, 
    createListCollection, 
    Text
} from "@chakra-ui/react";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "../../../src/components/ui/select";
import { toaster, Toaster } from "../../../src/components/ui/toaster";
import * as Yup from 'yup';
import { usePage } from "@inertiajs/react";
import { Friends } from "../utils/store/useUserStore";
import { white, softBlack, deepViolet } from "../utils/fontColor";
import { Auth } from "../utils/types";


interface ActionSendProps {
    contact?: Friends;
    auth?: Auth;
    friends?: Friends;
}


const ActionSend: React.FC<ActionSendProps> = ({ contact, friends, auth }) => {
    const deepViolet: string = "#906a9b";
    const checkFirstBoxes = [
        { text: "A un contact", name: 'contact' },
        { text: "Autre", name: 'entity' },
    ];
    const form = useRef<HTMLFormElement>(null);
    const { user, setUser } = useUserStore();
    const [checkedItem, setCheckedItem] = useState<string|null>(null);
    const [errMsg, setErrMsg] = useState<string>("")
    const [validValue, setValidValue] = useState<boolean>(false);
    const [value, setValue] = useState<string[] | string>('');
    //const [hover, setHover] = useState(false)
    const [collection, setCollection] = useState<any>(
                                                        createListCollection({
                                                            items: [],
                                                    }));
    const page: any = usePage();
                                                

    useEffect(()=>{
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.props?.csrf_token})
        }
    },[auth])
    
    useEffect(()=>{
        if (checkedItem === null){
            setValue('') 
        }
        setValidValue(false) 
        handleCheckboxClick()

    },[checkedItem])

    useEffect(()=>{
            if(contact?.id){
                setCheckedItem('contact')
                setValue([contact.id.toString()]) 
            }
    },[contact?.id])

    async function handleChange(e: ChangeEvent<HTMLInputElement>){
        const value = e.target.value;

        const floatNumber = parseFloat(value);
        if(isNaN(floatNumber)){
            setValidValue(false);
            setErrMsg('La valeur doit etre un nombre.');
        }
        const inputSchema = Yup.number()
                                .typeError('La valeur doit etre un nombre.')
                                .min(1, "Le montant ne doit pas etre inférieur à 1.")
                                .max(Number(user?.solde), "Le montant dépasse votre solde.");
        try {
            await inputSchema.validate(value);
            setErrMsg('');
            setValidValue(true);
        } catch (err: any) {
            setValidValue(false);
            setErrMsg(err.message);
        }
    }

    function handleCheckboxClick(){
        if(checkedItem != null){
            if(checkedItem === checkFirstBoxes[0].name){
                //const repertoire = user?.friends;
                let listFriends= friends?.map((friend: any)=>({
                    label: friend.firstname + " " + friend.name, 
                    value: friend.id.toString() 
                }))
                setCollection(createListCollection({
                    items: listFriends
                }))
            } else {
                let route = "/api/entities"
                fetchingDataPost(route, "entityRoute").then((data)=>{
                    const entities = data;
                    let friends= entities?.map((entity:any)=>({
                        label: entity.name, 
                        value: entity.id.toString() 
                    }))
                    setCollection(createListCollection({
                        items: friends
                    }))
                })
            } 
        }
    }

    function handleForm(e: React.FormEvent){
        e.preventDefault();
        if(!validValue){
            return;
        }
        if(form.current){
            const formData = new FormData(form.current)
            // formData.set('date', Date.now().toString())
            const userId: number|undefined = user?.id;
            if(userId){
                formData.set('from', userId.toString())
                formData.set('to', value.toString())
            }
            const route = "/send";
            
            
            toaster.promise(fetchingDataPost(route, "ActionSend", formData, page?.props?.csrf_token), {
                success: () => {
                    form.current?.reset()
                    return {
                        title: "Transaction réussie !",
                        description: "Vous pouvez renvoyé de l'argent à l'un de vos proches.",  
                    }
                },
                error: (err: any) =>( {
                  title: "Transaction échouée",
                  description: err?.message || "Une erreur est apparue dans le processus. Veuillez réésseyer",
                }),
                loading: () => { return { title: "En cours...", description: "Patientez s'il vous plait." } },
              })
            }
            
            // axios
			// .post("/send", {
			// 	test: "hello",
			// })
			// .then(() => {
			// 	console.log('/')
			// })
			// .catch(error => {
			// 	console.error("non")
			// });
        }
        
    

    return(
        <Box bg="#F5F5F5" minH={'100vh'} w={'100vw'}>
            
            <Header/>
        
            <Flex direction={'column'} justify={'center'} alignItems={'center'} h={'90%'}>
                <Card.Root variant={'elevated'} w={'30%'} minW={'300px'} p={2}>
                    <Card.Title as={"div"}>
                        <Heading>Noter votre dernier envoi</Heading>
                    </Card.Title>
                    <Card.Body>
                        <Box>
                            <form 
                                onSubmit={handleForm} 
                                ref={form}
                            >
                                <Heading>A qui envoyez vous de l'argent ?</Heading>
                                <HStack gap={5}>
                                    {checkFirstBoxes.map((checkbox, index) => (
                                    <Checkbox
                                        key={`${index}-${checkbox.text}`}
                                        _checked={{
                                            "& .chakra-checkbox__control": { bg: deepViolet, borderColor: deepViolet },
                                        }}
                                        variant="solid"
                                        color="softBlack"
                                        cursor="pointer"
                                        disabled={
                                            checkedItem === null || checkbox.name === checkedItem ? false : true
                                        }
                                        checked={checkedItem === checkbox.name} // Contrôle basé sur checkedItem
                                        onCheckedChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            setCheckedItem((prev) =>
                                                prev === checkbox.name ? null : checkbox.name
                                            ) // Permet de décocher ou de basculer
                                        }
                                    >
                                        {checkbox.text}
                                    </Checkbox>
                                ))}
                                </HStack>
                                {checkedItem &&
                                    <SelectRoot 
                                        collection={collection} 
                                        size={'sm'} 
                                        name='to'
                                        value={ value } 
                                        onValueChange={((e: any)=>{
                                           setValue(e.value)
                                        })}
                                        
                                    >
                                        <SelectLabel>A qui envoyez vous de l'argent ?</SelectLabel>
                                        <SelectTrigger>
                                            <SelectValueText placeholder="Choississez le destinataire"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                             {
                                                 collection?.items.map((item: any, index: number)=>(
                                                     <SelectItem 
                                                        bg={{base:'white', _hover:'deepViolet'}}
                                                        color={{base:'softBlack', _hover:'white'}}
                                                        item={item} 
                                                        key={`${index}_${Date.now()}}`}
                                                         
                                                     >
                                                         {item.label}
                                                     </SelectItem>
                                                 ))
                                             }
                                        </SelectContent>
                                    </SelectRoot>               
                                }
                                {
                                    value.length > 0 && 
                                        <Field label={'Combien souhaitez vous envoyer ? '}>
                                            <Input 
                                                name="amount"
                                                placeholder="5.00" 
                                                type="number" 
                                                step={'0.01'} 
                                                focusRingColor={deepViolet} 
                                                // onBlur={handleNumber} 
                                                onChange={handleChange} 
                                            />  
                                            {errMsg && <Text color={'red.400'}>{errMsg}</Text>}
                                        </Field>
                                        
                                }
                                {
                                    validValue && <Button type="submit" bg={'deepViolet'} mt={2}>Envoyer</Button>  
                                }
                            </form>
                        </Box>
                    </Card.Body>
                </Card.Root>
            </Flex>
        </Box>
    )
}

export default ActionSend;