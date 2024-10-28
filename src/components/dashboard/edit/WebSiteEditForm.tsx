"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { auctionSchema } from "@/lib/schema";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ImageDropzone } from "../new/ImageDropzone";

type auctionType = {
  _id?: number;
  titleKey?: string | undefined;
  titleValue?: string | undefined;
  rightLogoValue?: string | undefined;
  leftLogoValue?: string | undefined;
  imageValue?: string[] | undefined;
  videoKey?: string | undefined;
  videoValue: string;
  dateStart: Date;
  imageCover?: string | undefined;
};
type WebsiteEditFormProps = {
  website: auctionType;
};

const WebSiteEditForm = ({ website }: WebsiteEditFormProps) => {
  const router = useRouter();

  const form = useForm<auctionType>({
    mode: "onChange",
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      titleKey: website?.titleKey || "",
      titleValue: website?.titleValue || "",
      // videoKey: website?.videoKey || "",
      videoValue: website?.videoValue || "",
      imageValue: website?.imageValue || [],
      rightLogoValue: website?.rightLogoValue || "",
      leftLogoValue: website?.leftLogoValue || "",
      imageCover: website?.imageCover || "",
      dateStart: new Date(website.dateStart),
    },
  });

  const onSubmit: SubmitHandler<auctionType> = async (data) => {
    const formData = new FormData();

    if (data.titleKey) {
      formData.append("titleKey", data.titleKey);
    }
    if (data.titleValue) {
      formData.append("titleValue", data.titleValue);
    }
    // if (data.videoKey) {
    //   formData.append("videoKey", data.videoKey);
    // }
    formData.append("videoValue", data.videoValue);

    if (data.dateStart) {
      formData.append("dateStart", data.dateStart.toISOString());
    }

    if (data.imageCover) {
      const coverImageResponse = await fetch(data.imageCover);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("imageCover", coverImageBlob);
    }

    if (data.rightLogoValue) {
      const coverImageResponse = await fetch(data.rightLogoValue);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("rightLogoValue", coverImageBlob);
    }
    if (data.leftLogoValue) {
      const coverImageResponse = await fetch(data.leftLogoValue);
      const coverImageBlob = await coverImageResponse.blob();
      formData.append("leftLogoValue", coverImageBlob);
    }

    if (data.imageValue && data.imageValue.length > 0) {
      await Promise.all(
        data.imageValue.map(async (imageUrl) => {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          formData.append(`imageValue`, blob);
        })
      );
    }

    try {
      await axios.put(`${BASE_URL}${AUCTIONS}/${website._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("View Updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Error updaing view:", error);
      toast.error("Failed to update view");
    }
  };
  return (
    <div className="flex-1 rounded-lg bg-white px-4 py-6 shadow-sm sm:px-6">
      <div className="h-full min-h-[500px] w-full">
        <div className="flex items-center justify-between pb-4">
          <div className="mb-4 text-lg font-semibold">فورم المزاد</div>
          <Link
            locale="ar"
            href={`/${website._id}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
          >
            الذهاب الى وضع العرض
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="titleKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1C1C]">
                    العنوان
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.titleKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="titleValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1C1C]">
                    قيمة العنوان
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.titleValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="videoKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1C1C]">
                    {t("video Label")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.videoKey?.message}
                  </FormMessage>
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="videoValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1C1C1C]">
                    محتوى الفيديو
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.videoValue?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="dateStart"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>تاريخ البدء</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-between pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>اختر تاريخ البدء</span>
                            )}
                            <CalendarIcon className="h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>
                      {form.formState.errors.dateStart?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rightLogoValue"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageDropzone
                      label="اللوغو الايمن"
                      onChange={(value) =>
                        form.setValue("rightLogoValue", value as string)
                      }
                      value={form.watch("rightLogoValue") || ""}
                      error={form.formState.errors.rightLogoValue?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leftLogoValue"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageDropzone
                      label="اللوغو الأيسر"
                      onChange={(value) =>
                        form.setValue("leftLogoValue", value as string)
                      }
                      value={form.watch("leftLogoValue") || ""}
                      error={form.formState.errors.leftLogoValue?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageCover"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageDropzone
                      label="صورة الغلاف"
                      onChange={(value) =>
                        form.setValue("imageCover", value as string)
                      }
                      value={form.watch("imageCover") || ""}
                      error={form.formState.errors.imageCover?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageValue"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageDropzone
                      label="صور الموقع"
                      onChange={(value) =>
                        form.setValue("imageValue", value as string[])
                      }
                      value={form.watch("imageValue") || []}
                      multiple
                      error={form.formState.errors.imageValue?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex items-center justify-end">
              <Button type="submit">تحديث</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WebSiteEditForm;
