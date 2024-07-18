'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
})

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: 'dionatsir',
      password: '123123',
    },
  })

  const formSubmit = async (values) => {
    const login = await signIn('credentials', {
      username: form.getValues('username'),
      password: form.getValues('password'),
      redirect: false,
      // callbackUrl: searchParams.get('callbackUrl') || '/dashboard',
    })
    if (login?.error) {
      form.setError('username', {
        type: 'manual',
        message: login.error,
      })
    } else {
      router.push(login.url)
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form
        className="sm:space-y-6 space-y-4"
        onSubmit={form.handleSubmit(formSubmit)}
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  autoComplete="username"
                  placeholder="Input username anda disini"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Input password anda disini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" className="sm:w-48 w-full">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
