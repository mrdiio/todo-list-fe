import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TodosData from './Data'
import TodoForm from './Form'
import { Separator } from '@/components/ui/separator'

export default function TodoPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex-grow flex flex-col items-center w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl uppercase">Todo List</CardTitle>
            <CardDescription>Add a new todo item to the list</CardDescription>
          </CardHeader>

          <Separator className="mb-4" />

          <CardContent>
            <TodoForm />
          </CardContent>
        </Card>

        <TodosData />
      </div>
    </div>
  )
}
