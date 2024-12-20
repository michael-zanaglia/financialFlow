import React, {useEffect} from "react";
import { toaster } from "../../../src/components/ui/toaster";
import { useUserStore } from "../utils/store/useUserStore";

interface EchoListenerProps {
    friendReq: number[];
    setFriendReq: (newReq: number[])=> void;
}

const EchoListener: React.FC<EchoListenerProps> = ({ friendReq, setFriendReq })=>{
    
    const { user, setUser } = useUserStore();

    useEffect(()=>{
        const channel= window.Echo.private(`friend-request.${user?.id}`)
        .listen(`.friend.request.event`,(data: any)=>{
                    setFriendReq([...friendReq, data?.sender])
                    toaster.create({
                        title: "Un linker souhaite se lier à vous !"
                    })
                })

                return()=>{
                    channel.stopListening('.friend.request.event')
                }
    },[])

    return null;
}

export default EchoListener;