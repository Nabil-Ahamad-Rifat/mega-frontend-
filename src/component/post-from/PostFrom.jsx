import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, Rte } from "../index";
import service from "../../appWrite/configAp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostFrom(post) {
  const { register, handlSubmit, watch, setValue, control, getValues } =
    useForm({
        defaultValues: { title: post?.title || "",
        slug: post?.slug || "" },
        content:post.content ||"",
        status:post?.status ||'active',
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    const submit = async(data)=>{
        if(post){
            data.image[0] ? service.uploadfile :null
        }
    } 




  return <div>PostFrom</div>;
}

export default PostFrom;
