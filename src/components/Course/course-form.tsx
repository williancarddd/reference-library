"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { courseSchema } from "@/store/course.store"
import { Course } from "@/shared/types/coursesType"

interface CourseFormProps {
  onSubmit: (data: Course) => void;
  defaultValues: Course | null;
}

export function CourseForm({ onSubmit, defaultValues }: CourseFormProps) {
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: defaultValues || {
      name: "",
      ppc: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ppc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PPC</FormLabel>
              <FormControl>
                <Input placeholder="PPC of Computer Science" {...field} />
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
                <Textarea placeholder="This is a computer science course." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Save Course</Button>
      </form>
    </Form>
  )
}
