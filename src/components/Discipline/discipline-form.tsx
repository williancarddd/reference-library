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
import { Discipline } from "@/shared/types/disciplineType"
import { disciplineSchema } from "@/store/discipline.store"
import { useParams } from "next/navigation"

interface DisciplineFormProps {
  onSubmit: (data: Discipline) => void;
  defaultValues: Discipline | null;
}

export function DisciplineForm({ onSubmit, defaultValues }: DisciplineFormProps) {
  const form = useForm<Discipline>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: defaultValues || {
      name: "",
      period: 0,
      courseId: 0,
      theoreticalHours: 0,
      practicalHours: 0,
    },
  });
  // errors 
  console.log(form.formState.errors);
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
                <Input placeholder="Mathematics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="practicalHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pratical Hours</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theoreticalHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theorical Hours</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Save Discipline</Button>
      </form>
    </Form>
  )
}

export default DisciplineForm;
