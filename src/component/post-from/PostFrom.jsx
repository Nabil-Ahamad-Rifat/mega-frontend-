import React, { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Input, Select, Rte } from "../index";
import service from "../../appWrite/configAp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostFrom(post) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: { title: post?.title || "", slug: post?.slug || "" },
      content: post.content || "",
      status: post?.status || "active",
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadImage(data.image[0]) : null;
      if (file) {
        service.delefile(post.featuredImage);
      }

      const bdPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (bdPost) {
        navigate(`/post/${bdPost.$id}`);
      }
    } else {
      const file = await service.uploadImage(data.image[0]);
    }
    if (file) {
      const fileId = file.$id;
      data.featuredImage = fileId;
      const dbpost = await service.createPost({
        ...data,
        userId: userData.$id,
      });
      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-");
    }
    return "";
  }, []);

  const subscription = useWatch(
    (value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
      return () => {
        subscription.unsubscribe();
      };
    },
    [watch, slugTransform, setValue],
  );

  return (
    <div>
      <form
        action=""
        onSubmit={handlSubmit(submit)}
        className="flex flex-wrap "
      >
        <div className="w-2/3 px-2">
          <input
            label="title:"
            placeholder="title"
            className="mb-4"
            {...register(title, { required: true })}
          />
          <Input
            label="Slug:"
            placeholder="slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          <Rte
            label="content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className=" w-1/3 px-2">
          <Input
            label="FeatureImage"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4 ">
              <img
                src={service.getfilePreview(post.featureImage)}
                alt="post.title"
                className="rounded-lg"
              />
            </div>
          )}
          <Select
          options= {["active","inactive"]}
          label="status"
          className="mb-4"
          {...register("status",{required:true})}
          />
          <Button type="submit" bgColor={`post ? "bg-green-500":undefine`} className="w-full"> {post ? "update" :"submit"}</Button>
        </div>
      </form>
    </div>
  );
}

export default PostFrom;
