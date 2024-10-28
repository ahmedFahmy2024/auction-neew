"use client";
import { z } from "zod";

export const auctionSchema = z.object({
  titleKey: z.string().optional(),
  titleValue: z.string().optional(),
  rightLogoValue: z.string().optional(),
  leftLogoValue: z.string().optional(),
  imageValue: z.array(z.string()).optional(),
  videoKey: z.string().optional(),
  videoValue: z.string().optional(),
  dateStart: z.date(),
  imageCover: z.string().optional(),
});

export type auctionType = z.infer<typeof auctionSchema>;
