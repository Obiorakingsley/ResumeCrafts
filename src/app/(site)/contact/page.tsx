"use client";
import React from "react";
import Button from "@/app/(build)/_Utils/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useRef } from "react";

const page = () => {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  //Contact info zod schema
  const schema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters long").max(60),

    email: z.string().min(1, "Invalid email"),
    subject: z.string(),
    message: z.string(),
  });

  type contactUs = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const sendData = (data: contactUs) => {
    if (!form.current) return;
    emailjs
      .sendForm("gmail", "template_rw9m4id", form.current, "OMD1TAWuA87VPJxeb")
      .then(() => {
        toast.success("Message sent successfully");
        form.current?.reset(),
          (error: any) => {
            toast.error("Faild to send message");
            console.log(error);
          };
      });
  };
  return (
    <section className="flex flex-col w-full items-center justify-center py-12 px-3 min-h-[80vh]">
      <Button type="button" path="/" />
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-tight">Contact Us</h2>
        <p className="mt-2 text-lg">
          Please type your questions or message below
        </p>
      </div>

      <form
        ref={form}
        onSubmit={handleSubmit(sendData)}
        className="form dark:text-slate-300 text-black dark:bg-black/80 shadow-lg bg-slate-50 text-center p-8 rounded-xl shadow-slate-400/10 grid gap-4 sm:grid-cols-2 align-center border-2 border-slate-400/20"
      >
        <label htmlFor="Name">
          Name
          <input
            id="Name"
            type="text"
            placeholder="e.g. John Doe"
            autoFocus
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </label>

        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            placeholder="e.g. JohnDoe@email.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </label>

        <label className="sm:col-span-2" htmlFor="subject">
          Subject
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            {...register("subject")}
          />
          {errors.subject && (
            <span className="text-red-500 text-xs">
              {errors.subject.message}
            </span>
          )}
        </label>

        <label className="sm:col-span-2" htmlFor="contact">
          Message
          <textarea
            cols={35}
            rows={8}
            id="contact"
            placeholder="Send us a message"
            {...register("message")}
          ></textarea>
          {errors.message && (
            <span className="text-xs text-red-500">
              {errors.message.message}
            </span>
          )}
        </label>

        <Button
          type="submit"
          text="Send"
          className="place-self-end sm:col-span-2 my-2 bg-indigo-500 transition-colors hover:bg-indigo-600 py-1 px-3 rounded-md text-slate-50 cursor-pointer"
        />
      </form>
    </section>
  );
};

export default page;
