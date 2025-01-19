"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryStore } from "@/store/CategoryStore";
import { dummyCategories } from "@/lib/dummydata";
import { UpdateDialogStore } from "@/store/UpdateDialogStore";
import { useEffect } from "react";
import { updateProduct } from "@/api/products";
import { useMutation } from "@tanstack/react-query";
import { ProductStore } from "@/store/ProductStore";

const formSchema = z.object({
  title: z.string().min(2).max(255),
  price: z.coerce.number().gte(1),
  description: z.string().min(8).max(255),
  image: z.string().min(2),
  // image: z
  //   .instanceof(File, { message: "Please select an image" })
  //   .refine(
  //     (file) => file.size <= 5000000,
  //     "Image size should be less than 5MB."
  //   )
  //   .refine(
  //     (file) =>
  //       ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
  //     "File type should be JPEG, PNG, or PDF."
  //   ),
  category: z.string().min(2).max(255),
});

export function UpdateProduct({ confirm }: { confirm: () => void }) {
  const isOpenUpdate = UpdateDialogStore((state) => state.isOpen);
  const setOpenUpdate = UpdateDialogStore((state) => state.setOpenDialog);
  const itemData = UpdateDialogStore((state) => state.dialogData);

  const products = ProductStore((state) => state.products);
  const updateProducts = ProductStore((state) => state.updateProduct);

  const categories = CategoryStore((state) => state.categories);
  if (categories.length === 0) {
    const updateCategories = CategoryStore((state) => state.updateCategory);
    updateCategories(dummyCategories);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      image: "",
      category: "",
    },
  });

  // Fill the form with item data
  useEffect(() => {
    if (!isOpenUpdate) return;
    const itemDataParse = JSON.parse(itemData);
    const remapValues = {
      title: itemDataParse.title,
      price: Number(itemDataParse.price),
      description: itemDataParse.description,
      image: itemDataParse.image,
      category: itemDataParse.category,
    };
    form.reset(remapValues);
  }, [form, isOpenUpdate, itemData]);

  const { mutateAsync: updateCurrentProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users on success
      confirm();
      form.reset();
      setOpenUpdate(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const itemDataParse = JSON.parse(itemData);
    updateCurrentProduct({
      data: { ...values, price: values.price.toString() },
      id: itemDataParse.id,
    });

    const reMapProducts = products.map((product) => {
      if (product.id === itemDataParse.id) {
        return {
          ...product,
          ...values,
          price: values.price.toString(),
        };
      }
      return product;
    });
    updateProducts(reMapProducts);
  }

  return (
    <Dialog open={isOpenUpdate} onOpenChange={setOpenUpdate}>
      <DialogContent className="overflow-y-scroll max-h-[calc(100vh-100px)] p-8">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Add new product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Copy image url here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an image (JPEG, PNG, or PDF, max 5MB)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          <span className="capitalize">{category}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="mt-8" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
