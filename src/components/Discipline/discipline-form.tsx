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

interface DisciplineFormProps {
  onSubmit: (data: Discipline) => void;
  defaultValues: Discipline | null;
}

export function DisciplineForm({ onSubmit, defaultValues }: DisciplineFormProps) {
  const form = useForm<Discipline>({
    resolver: zodResolver(disciplineSchema),
    defaultValues: defaultValues || {
      name: "",
      cargaHoraria: 0,
      period: 0,
      courseId: 0,
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
                <Input placeholder="Mathematics" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cargaHoraria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carga Horária</FormLabel>
              <FormControl>
                <Input type="number" placeholder="120" {...field} />
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
                <Input type="number" placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1" {...field} />
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
