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
import { UpdateDialogStore } from "@/store/UpdateDialogStore";
import { useEffect } from "react";
import { updateUser } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { UserStore } from "@/store/UserStore";

const formSchema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(50),
  password: z.string().min(4).max(50),
  name: z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
  }),
  address: z.object({
    city: z.string().min(2).max(50),
    street: z.string().min(2).max(50),
    number: z.coerce.number().gte(1),
    zipcode: z.string().min(2).max(50),
    geolocation: z.object({
      lat: z.string().min(2).max(50),
      long: z.string().min(2).max(50),
    }),
  }),
  phone: z.string().min(2).max(50),
});

export function UpdateUser({ confirm }: { confirm: () => void }) {
  const isOpenUpdate = UpdateDialogStore((state) => state.isOpen);
  const setOpenUpdate = UpdateDialogStore((state) => state.setOpenDialog);
  const itemData = UpdateDialogStore((state) => state.dialogData);

  const users = UserStore((state) => state.users);
  const updateUsers = UserStore((state) => state.updateUsers);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      name: {
        firstname: "",
        lastname: "",
      },
      address: {
        city: "",
        street: "",
        number: undefined,
        zipcode: "",
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: "",
    },
  });

  // Fill the form with item data
  useEffect(() => {
    if (!isOpenUpdate) return;
    const itemDataParse = JSON.parse(itemData);
    const remapValues = {
      email: itemDataParse.email,
      username: itemDataParse.username,
      password: itemDataParse.password,
      name: {
        firstname: itemDataParse.name.firstname,
        lastname: itemDataParse.name.lastname,
      },
      address: {
        city: itemDataParse.address.city,
        street: itemDataParse.address.street,
        number: itemDataParse.address.number,
        zipcode: itemDataParse.address.zipcode,
        geolocation: {
          lat: "-37.3159",
          long: "81.1496",
        },
      },
      phone: itemDataParse.phone,
    };
    form.reset(remapValues);
  }, [form, isOpenUpdate]);

  const { mutateAsync: updateCurrentUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users on success
      confirm();
      form.reset();
      setOpenUpdate(false);
    },
  });

  // Submit update
  function onSubmit(values: z.infer<typeof formSchema>) {
    const itemDataParse = JSON.parse(itemData);
    updateCurrentUser({
      data: values,
      id: itemDataParse.id,
    });
    const reMapUsers = users.map((user) => {
      if (user.id === itemDataParse.id) {
        return {
          ...user,
          ...values,
        };
      }
      return user;
    });
    updateUsers(reMapUsers);
  }

  return (
    <Dialog open={isOpenUpdate} onOpenChange={setOpenUpdate}>
      <DialogContent className="overflow-y-scroll max-h-[calc(100vh-100px)] p-8">
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Update existing user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name.firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name.lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Street</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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
