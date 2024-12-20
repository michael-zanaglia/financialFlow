import React, { useEffect, useState } from "react";
import { User, useUserStore } from "../../utils/store/useUserStore";
import { usePage } from "@inertiajs/react";
import { Auth } from "../../utils/types";
import { Box, Button, Input, Stack, VStack, Card, Fieldset, Text } from "@chakra-ui/react";
import Header from "../../Components/Header";
import { deepViolet, softBlack, white } from "../../utils/fontColor";
import { Field } from "../../../../src/components/ui/field";
import { PiUploadSimple } from "react-icons/pi";
import { Avatar } from "../../../../src/components/ui/avatar";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../../../../src/components/ui/file-button";
import { useForm, router } from "@inertiajs/react";
import * as Yup from "yup";
import { toaster } from "../../../../src/components/ui/toaster";
import { progress } from "framer-motion";


interface ProfileProps {
    auth?: Auth;
}

const Profile: React.FC<ProfileProps> = ({ auth }) =>{

    const { user, setUser } = useUserStore();
    const page: any = usePage();
    const { data, setData } = useForm({
        name: auth?.user?.name,
        firstname: auth?.user?.firstname,
        email: auth?.user?.email,
        photo: null,
    })
    const [err, setErr] = useState({
        name: "",
        firstname: "",
        email: "",
        photo: "",
    })
    const [processing, setProcessing] = useState(false)
    const [validEntries, setValidEntries] = useState(true)

    const dataSchema = Yup.object({
        name: Yup.string()
                .required("Le nom est requis.")
                .min(2, "Le nom doit avoir minimum 2 caractères.")
                .max(50, "Le nom doit avoir moins de 50 caractères.")
                .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]+$/, "Le nom ne doit pas contenir de caractères spéciaux."),
        firstname: Yup.string()
                    .required("Le prénom est requis.")
                    .min(2, "Le prénom doit avoir minimum 2 caractères.")
                    .max(50, "Le prénom doit avoir moins de 50 caractères.")
                    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]+$/, "Le prénom ne doit pas contenir de caractères spéciaux."),
        email: Yup.string()
                .email("L\'adresse mail doit etre valide.")
                .required("Un email est requis."),
        photo: Yup.mixed<File>()
                .nullable()
                .test("fileType", "Le fichier doit uniquement etre de format jpg, png ou jpeg", (value)=>{
                    if (!value) return true;
                    return ['image/jpg', 'image/png', 'image/jpeg'].includes(value.type);
                })
                .test("fileSize", "Le taille de votre fichier ne peut dépasser 2MB.", (value)=>{
                    if(!value || value.size <= 2 * 1024 * 1024) return true;
                    return false;
                })
    });

    const [photoUrl, setPhotoUrl] = useState(auth?.user?.profile_photo_url);

    useEffect(()=>{
        if(auth?.user){
            setUser({...auth?.user, csrfToken: page?.props?.csrf_token})
        }
    },[auth])

    function handleUpdateProfileUser(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        router.post("user/profile-information",
            {
                _method: 'put',
                name: data.name,
                firstname: data.firstname,
                email: data.email,
                photo: typeof data.photo === "string" ? null : data.photo,
            }, {
                onSuccess : page => {
                    toaster.create({        
                        title: `Profil mis à jour !`,
                        type: "success"     
                })},
                onError: errors => {
                    toaster.create({
                        title: "Il y a eu une erreur pendant la mise à jour",
                        type: "error"
                    })
                },
                onStart: () => {setProcessing(true)},
                onFinish: () => {setProcessing(false)}
            })
            
    }
    async function handleFieldChange(field: string, value: any){
        try {
            await dataSchema.validateAt(field, { [field] : value })

            setErr((prev)=>({...prev, [field]: ""}))
            setData({...data, [field]: value})
            setValidEntries(true)
        } catch (error: any){
            setErr((prev)=>({...prev, [field]: error.message}))
            setValidEntries(false)
        }
    }

    return (
        <Box w={'100vw'} minH={'100vh'} bg={white} paddingBottom={'20px'}>
            <Header/>
            <VStack>
                <Card.Root variant='elevated' minW={'xl'}>
                    <Card.Body gap={2}>
                        <Fieldset.Root size={'lg'} maxW={'md'}>
                            <Stack>
                                <Fieldset.Legend>
                                    Votre profil
                                </Fieldset.Legend>  
                                <Fieldset.HelperText>
                                    Vous pouvez changer vos informations si nécéssaire.
                                </Fieldset.HelperText>
                            </Stack>
                            <form onSubmit={handleUpdateProfileUser}>
                                <Fieldset.Content>
                                    <Field label='Photo'>
                                        <Avatar
                                            name="photo"
                                            src={photoUrl}
                                            size='2xl'
                                        />
                                        <FileUploadRoot accept={["image/jpeg", "image/png", "image/jpg"]} 
                                            onFileChange={
                                                (e: any)=>{
                                                    handleFieldChange("photo", e.acceptedFiles[0])
                                                    setPhotoUrl(URL.createObjectURL(e.acceptedFiles[0]))
                                            }}
                                        >
                                            <FileUploadTrigger>
                                                <Button bg={{base: softBlack, _hover: deepViolet}} size={'sm'}>
                                                    <PiUploadSimple />
                                                    Upload
                                                </Button>
                                            </FileUploadTrigger>
                                            <FileUploadList />
                                        </FileUploadRoot>
                                    </Field>
                                    {err.photo && <Text color={"red.600"}>{err.photo}</Text>}

                                    <Field label='Prénom'>
                                        <Input name='firstname' defaultValue={data.firstname} focusRingColor={deepViolet} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleFieldChange("firstname", e.target.value)} />
                                    </Field>
                                    {err.firstname && <Text color={"red.600"}>{err.firstname}</Text>}

                                    <Field label='Nom'>
                                        <Input name='name' defaultValue={data.name} focusRingColor={deepViolet} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleFieldChange("name", e.target.value)} />
                                    </Field>
                                    {err.name && <Text color={"red.600"}>{err.name}</Text>}

                                    <Field label='Email'>
                                        <Input name='email' defaultValue={data.email} focusRing={err.email ? "red" : ""} focusRingColor={deepViolet} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>handleFieldChange("email", e.target.value)}/>
                                    </Field>
                                    {err.email && <Text color={"red.600"}>{err.email}</Text>}

                                </Fieldset.Content>
                                <Button bg={{base: softBlack, _hover: deepViolet}} maxW={'150px'} mt={5} type="submit" disabled={processing || !validEntries}>
                                    Sauvegarder
                                </Button>
                            </form>
                           
                        </Fieldset.Root>
                    </Card.Body>
                </Card.Root>
            </VStack>
        </Box>
    )
}

export default Profile;