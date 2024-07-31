import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PencilLine, Trash2 } from 'lucide-react'

export default function TodosData() {
  return (
    <div className="py-6 w-full">
      <Card>
        <CardContent className="pt-6 grid md:grid-cols-5">
          <div className="md:col-span-4 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div>
                <Badge variant={'destructive'} className={'uppercase'}>
                  Complete
                </Badge>
              </div>
              <h2 className="text-2xl font-bold">Todo List</h2>
            </div>
            <p className="text-sm text-gray-500">
              Add a new todo item to the list by filling out the form below.
            </p>
          </div>
          <Separator className="my-2 md:hidden" />
          <div className="flex justify-end items-center gap-2">
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>

            <Button size="icon">
              <PencilLine className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
