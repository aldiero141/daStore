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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategoryStore } from "@/store/CategoryStore";
import { UpdateDialogStore } from "@/store/UpdateDialogStore";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export function UpdateCategory({ confirm }: { confirm: () => void }) {
  const isOpenUpdate = UpdateDialogStore((state) => state.isOpen);
  const setOpenUpdate = UpdateDialogStore((state) => state.setOpenDialog);
  const dialogData = UpdateDialogStore((state) => state.dialogData);

  const categories = CategoryStore((state) => state.categories);
  const updateCategories = CategoryStore((state) => state.updateCategory);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Get Data from Table Cell

  // Fill the form with dummy data
  useEffect(() => {
    if (isOpenUpdate) form.reset({ name: JSON.parse(dialogData).original });
  }, [dialogData, form, isOpenUpdate]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = JSON.parse(dialogData);
    const newCategory = categories.map((val, index) => {
      if (index === categories.indexOf(data.original)) return values.name;
      return val;
    });
    updateCategories(newCategory);
    confirm();
    setOpenUpdate(false);
  }

  return (
    <Dialog open={isOpenUpdate} onOpenChange={setOpenUpdate}>
      <DialogContent className="overflow-y-scroll max-h-[calc(100vh-100px)] p-8">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Add new category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
