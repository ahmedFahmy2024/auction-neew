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
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { auctionSchema, auctionType } from "@/lib/schema";
import { AUCTIONS, BASE_URL } from "@/server/Api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "./ImageDropzone";

const WebSiteForm = () => {
  const router = useRouter();

  const form = useForm<auctionType>({
    mode: "onChange",
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      dateStart: new Date(),
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
    if (data.videoValue) {
      formData.append("videoValue", data.videoValue);
    }

    formData.append("dateStart", data.dateStart.toISOString());

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
      const response = await axios.post(`${BASE_URL}${AUCTIONS}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const id = response.data.data._id;
      toast.success("تم انشاء المزاد بنجاح");
      form.reset();
      router.push(`/dashboard/auctions/${id}`);
      router.refresh();
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction");
    }
  };

  return (
    <div className="flex-1 rounded-lg bg-white px-4 py-6 shadow-sm sm:px-6">
      <div className="h-full min-h-[500px] w-full">
        <div className="mb-4 text-lg font-semibold">فورم المزاد</div>
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

            <FormField
              control={form.control}
              name="rightLogoValue"
              render={() => (
                <FormItem>
                  <FormControl>
                    <ImageDropzone
                      label="اللوغو الأيمن"
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
              <Button type="submit">تأكيد</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WebSiteForm;
