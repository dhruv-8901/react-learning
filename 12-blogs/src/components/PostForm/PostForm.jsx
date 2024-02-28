import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button, Select, RTE } from "../";
import appwriteServices from "../../appwrite/config";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
        slug: post?.slug || "",
      },
    });

  const onSubmit = async (data) => {
    if (post) {
      const image = data.image[0]
        ? await appwriteServices.fileUpload(data.image[0])
        : null;
      if (image) {
        await appwriteServices.deleteFile(post.featuredImage);
      }

      const update = await appwriteServices.updateBlog(post.$id, {
        ...data,
        featuredImage: image ? image.$id : post.featuredImage,
      });

      if (update) {
        navigate(`/post/${post.$id}`);
      }
    } else {
      const image = await appwriteServices.fileUpload(data.image[0]);
      const add = await appwriteServices.createBlog({
        ...data,
        featuredImage: image.$id,
        userId: userData.$id,
      });

      if (add) {
        navigate(`/post/${add.$id}`);
      }
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

      return "";
    }, []);

    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue(
            "slug",
            slugTransform(value.title, { shouldValidate: true })
          );
        }
      });

      return () => subscription.unsubscribe;
    }, [watch, slugTransform, setValue]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteServices.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
