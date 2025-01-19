import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export const formatCurrency = (value: number, numFormat: string = 'en-US', currency: string = "USD") =>   {
  const currencyValue = new Intl.NumberFormat(numFormat, {
      style: 'currency',
      currency: currency,
  })
  return currencyValue.format(value)
}

export const  getBase64Image = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  // eslint-disable-next-line prefer-const
  let ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
