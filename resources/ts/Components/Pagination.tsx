import { HStack, Text } from "@chakra-ui/react";
import { Link } from "@inertiajs/react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

import React, { useState } from "react";
import { color } from "framer-motion";
import { deepViolet, lavande, softBlack, white } from "../utils/fontColor";

interface PaginationProps {
    links: {
        url: string|null;
        label: string;
    }[];
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ links, currentPage })=>{

    const [isHovered, setIsHovered]= useState<string>('');
    const paginationStyle = (label: string, isUrl: boolean): React.CSSProperties => ({
        border: isHovered === label && isUrl || label === currentPage.toString() ? `1px solid ${lavande}` : isUrl ? '1px solid #292929' : '1px solid grey', 
        minWidth:'30px', 
        minHeight:'30px', 
        borderRadius:'3px', 
        cursor: isUrl ? 'pointer' : 'not-allowed', 
        backgroundColor: isHovered === label && isUrl || label === currentPage.toString() ? deepViolet : 'white', 
        color: isHovered === label && isUrl || label === currentPage.toString() ? white : softBlack,
    });

    return (
        <HStack wrap="wrap" gap={2} alignSelf={'start'}>
            {
                links?.length > 3 && (
                    links?.map((link : any, key: number)=>(
                        link?.url ?
                            <Link 
                                as={'button'} 
                                href={link.url} 
                                style={paginationStyle(link.label, true)} 
                                onMouseLeave={()=>setIsHovered('')} 
                                onMouseEnter={()=>setIsHovered(link.label)}
                                key={`${link.label}_page_${key}`}  
                            >
                                <Text 
                                    fontSize={'0.9em'}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {
                                        link.label === 'pagination.previous' ? 
                                            <MdOutlineKeyboardArrowLeft size={"1.5em"} /> : 
                                            link.label === 'pagination.next' ?
                                            <MdOutlineKeyboardArrowRight size={"1.5em"} />:
                                                link.label
                                    }
                                </Text>
                            </Link>
                        : 
                            <Text 
                                key={`${link.label}_page_${key}`}  
                                fontSize={'0.9em'} 
                                style={paginationStyle(link.label, false)} 
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                onMouseEnter={()=>{setIsHovered(link.label)}} 
                                onMouseLeave={()=>setIsHovered('')}
                            >
                                {
                                        link.label === 'pagination.previous' ? 
                                            <MdOutlineKeyboardArrowLeft size={"1.5em"} color="grey" /> : 
                                            link.label === 'pagination.next' ?
                                            <MdOutlineKeyboardArrowRight size={"1.5em"} color="grey" />:
                                                link.label
                                }
                            </Text>
                        
                    ))
                )
            } 
        </HStack>
    )
}

export default Pagination;